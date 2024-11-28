"use client";

import { DateToUTCDate } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GetTransactionHistoryResponseType } from "@/app/api/transactions-history/route";

interface Props {
  from: Date;
  to: Date;
}

type TransactionHistoryRow = GetTransactionHistoryResponseType[0];

export const columns: ColumnDef<TransactionHistoryRow>[] = [
  {
    accessorKey: "category",
    cell: ({ row }) => (
      <div>
        {row.original.categoryIcon}
        <div>{row.original.category}</div>
      </div>
    ),
  },
];

const TransactionTable = ({ from, to }: Props) => {
  const history = useQuery<GetTransactionHistoryResponseType>({
    queryKey: ["transactions", "history", from, to],
    queryFn: async () => {
      const response = await fetch(
        `/api/transactions-history?from=${DateToUTCDate(
          from
        )}&to=${DateToUTCDate(to)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transaction history");
      }

      const data: GetTransactionHistoryResponseType = await response.json();
      return data;
    },
  });
  return <div>TransactionTable</div>;
};

export default TransactionTable;
