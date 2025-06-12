"use server";

import { db } from "lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const seriliazeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }

  return serialized;
};

export async function CreateAccount(data) {
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

    //balance to float before saving
    const balance = parseFloat(data.balance);
    if (isNaN(balance)) {
      throw new Error("Invalid balance");
    }

    // checking is this first account or not , and set to default account
    const existingAccounts = await db.account.findMany({
      where: {
        userId: user.id,
      },
    });
    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    //making other accounts non default if this is first account or if this is default account
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: { isDefault: false },
      });
    }

    // Convert type to uppercase to match Prisma enum values
    if (data.type && typeof data.type === "string") {
      data.type = data.type.toUpperCase();
    }

    //creating new account
    const newAccount = await db.account.create({
      data: {
        ...data,
        balance: balance,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    const serializedAccount = seriliazeTransaction(newAccount);

    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    console.error(error);
  }
}

export async function getuserAccount() {
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

  const accounts = await db.account.findMany({
    where: { userId: user.id },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });

  const serializedAccounts = accounts.map((account) => seriliazeTransaction(account));

  return serializedAccounts;
}

export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get all user transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(seriliazeTransaction);
}