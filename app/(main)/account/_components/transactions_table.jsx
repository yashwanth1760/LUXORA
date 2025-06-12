"use client";
import React, { useEffect, useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { categoryColors } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MoreHorizontal,
  RefreshCcw,
  Search,
  Trash,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { bulkDeleteTransactions } from "@/actions/updateAccount";
import { toast } from "sonner";
import { BarLoader } from "react-spinners";

const RECURRING_INTERVALS = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
};

const TransactionTable = ({ transactions }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const [sortConfigIds, setSortConfigIds] = useState({
    field: "date",
    order: "desc",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [typeFilter, setTypeFilter] = useState("");

  const [recurringFilter, setRecurringFilter] = useState("");

  const {
    loading: loadingTransactions,
    fn: deleteFn,
    data: deleted,
  } = useFetch(bulkDeleteTransactions);

  const handlesort = (field) => {
    setSortConfigIds((current) => ({
      field,
      order:
        current.field == field && current.order === "desc" ? "asc" : "desc",
    }));
  };

  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length == transactionsAndSort.length
        ? []
        : transactionsAndSort.map((t) => t.id)
    );
  };

  const handleSingleDelete = async (id) => {
    await deleteFn([id]);
    router.refresh(); // ya koi state update karo jisse UI fresh ho jaye
  };

  useEffect(() => {
    if (!loadingTransactions && deleted) {
      toast.error("Transaction deleted successfully");
    }
  }, [loadingTransactions, deleted]);

  const clearAllFilters = () => {
    // implement clear all filters logic here
    setSearchTerm(""), setTypeFilter(""), setRecurringFilter("");
    setSelectedIds([]);
  };

  const transactionsAndSort = useMemo(() => {
    let result = [...transactions];

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter((transaction) =>
        transaction.description?.toLowerCase().includes(lowerTerm)
      );
    }

    if (recurringFilter) {
      result = result.filter((transaction) => {
        if (recurringFilter == "RECURRING") {
          return transaction.isRecurring;
        } else {
          return !transaction.isRecurring;
        }
      });
    }

    if (typeFilter) {
      result = result.filter((transaction) => {
        if (typeFilter == "INCOME") {
          return transaction.type == "INCOME";
        } else {
          return transaction.type == "EXPENSE";
        }
      });
    }

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfigIds.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      return sortConfigIds.order == "asc" ? comparison : -comparison;
    });

    return result;
  }, [
    searchTerm,
    sortConfigIds,
    selectedIds,
    typeFilter,
    recurringFilter,
    transactions,
  ]);

  const router = useRouter();

  const bulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} transactions?`
      )
    )
      return;
     await deleteFn(selectedIds);
    setSelectedIds([]);
     router.refresh();
  };

  return (
    <div className="space-y-1 pt-4">
      {loadingTransactions && (
        <BarLoader className="mt-4" width="100%" color="#FFD700" />
      )}

      {/* filters */}
      <div className="flex flex-col sm:flex-row  gap-4 pt-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            className="pl-8 border border-gray-300 rounded outline-none "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={typeFilter}
            onValueChange={(value) => {
              setTypeFilter(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EXPENSE">Expense</SelectItem>
              <SelectItem value="INCOME">Income</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={recurringFilter}
            onValueChange={(value) => {
              setRecurringFilter(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RECURRING">Recurring</SelectItem>
              <SelectItem value="NON-RECURRING">Non-Recurring</SelectItem>
            </SelectContent>
          </Select>

          {selectedIds.length > 0 && (
            <div className="flex gap-2 items-center">
              <Button
                variant={"destructive"}
                size={"sm"}
                onClick={bulkDelete}
                disabled={loadingTransactions}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Selected {selectedIds.length}
              </Button>
            </div>
          )}

          {(searchTerm || typeFilter || recurringFilter) && (
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={clearAllFilters}
              title="clear filter"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* transactions  table */}
      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  onCheckedChange={handleSelectAll}
                  checked={
                    selectedIds.length === transactionsAndSort.length &&
                    transactionsAndSort.length > 0
                  }
                />
              </TableHead>
              <TableHead
                className={"cursor-pointer"}
                onClick={() => handlesort("date")}
              >
                <div className="flex items-center">
                  Date {"  "}
                  {sortConfigIds.field == "date" &&
                    (sortConfigIds.order === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead
                className={"cursor-pointer"}
                onClick={() => handlesort("category")}
              >
                <div className="flex items-center">
                  Category
                  {sortConfigIds.field == "category" &&
                    (sortConfigIds.order === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className={"cursor-pointer"}
                onClick={() => handlesort("amount")}
              >
                <div className="flex items-center justify-end">
                  Amount
                  {sortConfigIds.field == "amount" &&
                    (sortConfigIds.order === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead className={"w-50px"}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionsAndSort.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className={"text-center text-muted-foreground items-center"}
                >
                  No Transaction Details Found
                </TableCell>
              </TableRow>
            ) : (
              transactionsAndSort.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      onCheckedChange={() => handleSelect(transaction.id)}
                      checked={selectedIds.includes(transaction.id)}
                    />
                  </TableHead>
                  <TableCell>
                    {format(new Date(transaction.date), "pp")}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={"capitalize"}>
                    <span
                      className={"px-2 py-1 rounded text-white text-small"}
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell
                    className="text-right font-medium"
                    style={{
                      color:
                        transaction.type === "EXPENSE" ? "#C53030" : "#2F855A", // deep red and rich green
                      fontWeight: "600",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}$
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {transaction.isRecurring ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant="outline"
                              className="gap-3 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
                            >
                              <RefreshCcw className="h-3 w-3" />
                              {
                                RECURRING_INTERVALS[
                                  transaction.recurringInterval
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex flex-col px-3 py-2 bg-white rounded-md w-fit outline-1 outline-black">
                              <div className="text-[10px] font-medium text-amber-600 tracking-wide mb-0.5">
                                Next Date:
                              </div>
                              <div className="text-xs font-semibold text-gray-800">
                                {format(
                                  transaction.nextRecurringDate,
                                  "dd/MM/yyyy"
                                )}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Badge
                        variant="outline"
                        className="gap-2 border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                      >
                        <Clock className="h-3 w-3 text-gray-500" />
                        ONE-TIME
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className={"p-0 h-8 w-8"}>
                          <MoreHorizontal className="w-4 h-4 p-0" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel
                          onClick={() =>
                            router.push(
                              `/transaction/create?edit=${transaction.id}`
                            )
                          }
                          className={"cursor-pointer"}
                        >
                          Edit
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleSingleDelete(transaction.id)}
                          className={"text-destructive cursor-pointer"}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
