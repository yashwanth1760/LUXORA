import React, { Suspense } from "react";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getDashboardData, getuserAccount } from "@/actions/dashboard";
import AccountCard from "./_components/account.card";
import { getUserDetails } from "@/actions/budget";
import {BudgetProgress} from "./_components/budgetProgress";
import { DashboardOverview } from "./_components/dashBoardOver";

const DashboardPage = async () => {
  const account = await getuserAccount();

 const defaultAccount =
    account?.find((acc) => acc.isDefault) || account?.[0];

  let budgetData = null;

  if (defaultAccount) {
    budgetData = await getUserDetails(defaultAccount.id);
  }

  console.log(budgetData);

  const serialized = account.map((acc) => ({
    ...acc,
    balance:
      typeof acc.balance.toNumber === "function"
        ? acc.balance.toNumber()
        : Number(acc.balance),
  }));

  const transactions = await getDashboardData();

  return (
    <div className="px-5">
      {/* Budget progress */}

      { defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          curr_expense={budgetData?.Curr_Expenses || 0}
        />
      )}

      {/* Overview */}
      <div className="mt-5">
          <Suspense fallback={"Loading Overview .."}>
        <DashboardOverview
          accounts={account}
          transactions={transactions || []}
          
        />
      </Suspense>
      </div>
      

      {/* Accounts Grid */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5 ">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2 " />
              <p className="text-m font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {serialized.length > 0 &&
          serialized.map((acc) => <AccountCard key={acc.id} Account={acc} />)}
      </div>
    </div>
  );
};

export default DashboardPage;
