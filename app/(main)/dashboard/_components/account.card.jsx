"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { updateAccount } from "@/actions/updateAccount";
import { toast } from "sonner";

const AccountCard = ({ Account }) => {
  const {
    name,
    type,
    id,
    balance,
    isDefault,
    userId,
  } = Account;


  console.log(userId);

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateAccount);

  const handleDefaultChange = async () => {
    if (isDefault) {
      toast.warning("You need at least one account as Default");
      return;
    }

    await updateDefaultFn(id);
  };


  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  return (
    <div>
      <Card className="hover:shadow-md transition-shadow group relative">
        <Link href={`account/${id}`}>
        
          <CardHeader className="flex flex-row items-center justify-between space-y-1.5 pb-2">
            <CardTitle className="text-sm font-medium capitalize">
              {name}
            </CardTitle>
            <Switch
              checked={isDefault}
              disabled={updateDefaultLoading}
              onClick={handleDefaultChange}
              className="cursor-pointer"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${parseFloat(balance).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} Account
            </p>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground gap-y-4 mt-4">
            <div className="flex items-center">
              <ArrowUpRight className="mr-4 h-4 w-4 text-green-500" />
              Income
            </div>
            <div className="flex items-center">
              <ArrowDownRight className="mr-4 h-4 w-4 text-red-500" />
              Expense
            </div>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default AccountCard;
