"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { DeleteTransaction } from "../_action/deleteTransaction";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  transactionId: string;
}

const DeleteTransactionDialog = ({ open, setOpen, transactionId }: Props) => {
  const queryClient = useQueryClient();
  const deletMutation = useMutation({
    mutationFn: DeleteTransaction,
    onSuccess: async () => {
      toast.success("Transaction deleted sucessfully", {
        id: transactionId,
      });
      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
    onError: () => {
      toast.error("somthing went wrong", {
        id: transactionId,
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            transaction
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading("Deleting transaction...", {
                id: transactionId,
              });
              deletMutation.mutate(transactionId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionDialog;
