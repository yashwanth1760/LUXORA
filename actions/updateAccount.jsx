"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "lib/prisma";
import { revalidatePath } from "next/cache";
import { date } from "zod";

const serializeTransaction = (obj) => {
  if (!obj) return obj;
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }

  return serialized;
};

export async function updateAccount(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // First, unset any existing default account
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: { isDefault: false },
    });

    // Then set the new default account
    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getTransactionDetails_User(account_id) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User is not authenticated");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const account = await db.account.findUnique({
      where: {
        id: account_id,
        userId: user.id,
      },
      include: {
        transactions: {
          orderBy: {
            date: "desc",
          },
        },
        _count: {
          select: { transactions: true },
        },
      },
    });

    if (!account) {
      return null;
    }

    return {
      ...serializeTransaction(account),
      transactions: account.transactions
        ? account.transactions.map(serializeTransaction)
        : [],
    };
  } catch (error) {
    console.error("getTransactionDetails_User error:", error);
    return null;
  }
}

// export async function bulkDeleteTransactions(transactionIds) {
//   try {
//     console.log("bulkDeleteTransactions called with IDs:", transactionIds);
//     const { userId } = await auth();
//     if (!userId) throw new Error("User is not authenticated");

//     const user = await db.user.findUnique({
//       where: { clerkUserId: userId },
//     });

//     if (!user) throw new Error("User not found");

//     const transactions = await db.transaction.findMany({
//       where: {
//         id: { in: transactionIds },
//         userId: user.id,
//       },
//     });

//     if (transactions.length !== transactionIds.length) {
//       console.warn(
//         `Mismatch in transactions found (${transactions.length}) and IDs requested (${transactionIds.length})`
//       );
//     }

//     const accountBalanceChanges = transactions.reduce((acc, curr) => {
//       const change = curr.type === "EXPENSE" ? curr.amount : -curr.amount;
//       acc[curr.accountId] = (acc[curr.accountId] || 0) + change;
//       return acc;
//     }, {});

//     await db.$transaction(async (tx) => {
//       const deleteResult = await tx.transaction.deleteMany({
//         where: {
//           id: { in: transactionIds },
//           userId: user.id,
//         },
//       });

//       console.log(`Deleted ${deleteResult.count} transactions`);

//       for (const [accountId, change] of Object.entries(accountBalanceChanges)) {
//         await tx.account.update({
//           where: { id: accountId },
//           data: { balance: { increment: change } },
//         });
//       }
//     });

//     // Revalidate each affected account path dynamically
//     for (const accountId of Object.keys(accountBalanceChanges)) {
//       revalidatePath(`/account/${accountId}`);
//     }
//     revalidatePath("/dashboard");

//     return { success: true };
//   } catch (error) {
//     console.error("bulkDeleteTransactions error:", error);
//     return { success: false, error: error.message };
//   }
// }

// export async function bulkDeleteTransactions(transactionIds) {

// }

export async function bulkDeleteTransactions(transactionIds) {
  console.log(transactionIds);

  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get transactions to calculate balance changes
    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    // Group transactions by account to update balances
    const accountBalanceChanges = transactions.reduce((acc, transaction) => {
      const change =
        transaction.type === "EXPENSE"
          ? transaction.amount
          : -transaction.amount;
      acc[transaction.accountId] =
        (acc[transaction.accountId] ?? 0) + Number(change);

      return acc;
    }, {});

    console.log(accountBalanceChanges);
    // Delete transactions and update account balances in a transaction
    await db.$transaction(async (tx) => {
      // Delete transactions
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      // Update account balances
      for (const [accountId, balanceChange] of Object.entries(
        accountBalanceChanges
      )) {
        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
