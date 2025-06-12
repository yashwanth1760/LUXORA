"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "./ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { CreateAccount } from "@/actions/dashboard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "Current",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    fn: CreateAccountFn,
    loading: CreateAccountLoading,
  } = useFetch(CreateAccount);

  const onSubmit = async (data) => {
    await CreateAccountFn(data);
  };

  useEffect(() => {
    if (newAccount && !CreateAccountLoading) {
      toast.success("Account Created Successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, CreateAccountLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to Create  Account");
    }
  }, [error]);

  return (
    <Drawer
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) reset(); // ← resets the form when drawer closes
      }}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className="space-y-2 w-full">
              {" "}
              {/* ← changed: added w-full */}
              <label htmlFor="name" className="text-sm font-medium">
                Account Name
              </label>
              <Input
                id="name"
                placeholder=" e.g :- work/personal "
                className="w-full" // ← changed: added w-full
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* type */}
            <div className="space-y-2 w-full">
              <label htmlFor="type" className="text-sm font-medium">
                Account Type
              </label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type")}
              >
                <SelectTrigger id="type" className="w-full">
                  {" "}
                  {/* ← changed: added w-full */}
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {" "}
                  {/* ← changed: added w-full */}
                  <SelectItem value="Current">Current</SelectItem>
                  <SelectItem value="Savings">Savings</SelectItem>
                </SelectContent>
              </Select>

              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* balance */}
            <div className="space-y-2 w-full">
              {" "}
              {/* ← changed: added w-full */}
              <label htmlFor="balance" className="text-sm font-medium">
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="w-full" // ← changed: added w-full
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-sm text-red-500">{errors.balance.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3 ">
              <div className="space-y-0.5">
                <label
                  htmlFor="isDefault"
                  className="text-sm font-medium cursor-pointer"
                >
                  Set as Default
                </label>

                <p className="text-sm text-muted-foreground">
                  This account will be selected by default for transactions
                </p>
              </div>

              <Switch
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                checked={watch("isDefault")}
              />

              {errors.isDefault && (
                <p className="text-sm text-red-500">
                  {errors.isDefault.message}
                </p>
              )}
            </div>
            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DrawerClose>

              <Button
                type="submit"
                className="mx-2 flex-1"
                disabled={CreateAccountLoading}
              >
                {CreateAccountLoading ? (
                  <>
                    <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                    Creating
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
