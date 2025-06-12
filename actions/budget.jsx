"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUserDetails(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const budget = await db.budget.findFirst({
      where: {
        userId: user.id,
      },
    });

   
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const expensesOfMonth = await db.transaction.aggregate({
      where: {
        userId: user.id,
        type: "EXPENSE",
        accountId,
        date: {
        gte:startOfMonth,
        lte:endOfMonth
      },
      },
      

      _sum: {
        amount: true,
      },
    });

    return {
      budget: budget
        ? {
            id: budget.id,
            userId: budget.userId,
            amount: budget.amount.toNumber(), // 👈 convert Decimal to number
            lastAlertSent: budget.lastAlertSent,
            createdAt: budget.createdAt.toISOString(), // 👈 convert Date to string
            updatedAt: budget.updatedAt.toISOString(),
          }
        : null,
      Curr_Expenses: expensesOfMonth._sum.amount
        ? expensesOfMonth._sum.amount.toNumber()
        : 0,
    };
  } catch (error) {
    console.log("fetching the data error" + error);
    throw error;
  }
}

export async function updateBudget(amount) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const userUpdated = await db.budget.upsert({
      where: {
        userId: user.id,
      },
      update: {
        amount,
      },
      create: {
        userId: user.id,
        amount,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "User details updated successfully",
      data: {
        userUpdated: {
          id: userUpdated.id,
          amount: userUpdated.amount.toNumber(),
          userId: userUpdated.userId,
          lastAlertSent: userUpdated.lastAlertSent,
          createdAt: userUpdated.createdAt.toISOString(),
          updatedAt: userUpdated.updatedAt.toISOString(),
        },
      },
    };
  } catch (error) {
    console.log("error updating user details");
    return { success: false, message: error.message };
  }
}
