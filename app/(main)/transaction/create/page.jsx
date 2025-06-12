

import { getUserDetails } from "@/actions/budget";
import { defaultCategories } from "@/data/categories";
import React from "react";

import { getuserAccount } from "@/actions/dashboard";
import { AddTransactionForm } from "../_components/addTransactionForm";


export default async function AddTransactions({ searchParams }){
  const Accounts = await getuserAccount();
   const editId = searchParams?.edit;
   console.log("editttttttttt"+editId);

   

  console.log(Accounts);

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-br from-yellow-500 to-yellow-700 text-transparent bg-clip-text drop-shadow-md text-center">
          Add Transaction
        </h1>
      </div>
      <AddTransactionForm
        accounts={Accounts}
        categories={defaultCategories}
      />
    </div>
  );
};

