import React, { Suspense } from "react";
import { getTransactionDetails_User } from "actions/updateAccount";

import NotFound from "app/not-found";
import TransactionTable from "../_components/transactions_table";
import { Loader } from "lucide-react";
import { BarLoader } from "react-spinners";
import AccountChart from "../_components/account_chart";

const page = async ({ params }) => {
  const awaitedParams = await params;
  const accountData = await getTransactionDetails_User(awaitedParams.id);

  if (!accountData) {
    return <NotFound />;
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="gap-y-4">
      <div className="flex justify-between items-end px-5 gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-bold sm:text-4xl capitalize leading-tight bg-gradient-to-br from-yellow-500 to-yellow-700 text-transparent bg-clip-text drop-shadow-md">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0).toUpperCase() +
              account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} transactions
          </p>
        </div>
      </div>

      {/* chart table*/}

      <Suspense
        fallback={
          <BarLoader className=" mt-4  width={100%} color={#9333ea} " />
        }
      >
        <AccountChart transactions={transactions} />
        
      </Suspense>

      {/* transaction table */}
      <Suspense
        fallback={
          <BarLoader className=" mt-4  width={100%} color={#9333ea} " />
        }
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default page;
