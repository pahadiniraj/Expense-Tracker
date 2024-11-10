"use client";

import * as React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Currencies, Currency } from "@/lib/currencies";
import { useMutation, useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";
import { toast } from "sonner";

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedOption, setSelectedOption] = React.useState<Currency | null>(
    null
  );

  const userSettings = useQuery({
    queryKey: ["userSettings"],
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
  });

  React.useEffect(() => {
    if (!userSettings.data) return;
    const userCurrency = Currencies.find(
      (currency) => currency.value === userSettings.data.currency
    );

    if (userCurrency) setSelectedOption(userCurrency);
  }, [userSettings.data]);

  const mutation = useMutation({
    mutationFn: async (currency: string) => {
      const response = await fetch("/api/user-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency }),
      });
      if (!response.ok) throw new Error("Failed to update currency");
      return response.json();
    },
  });

  const selectOption = React.useCallback(
    (currency: Currency | null) => {
      if (!currency) {
        toast.error("Please select the currency");
        return;
      }

      const loadingToast = toast.loading("Updating currency...", {
        id: "update-currency",
      });

      mutation.mutate(currency?.value, {
        onSuccess: (data) => {
          toast.success("Currency updated successfully", { id: loadingToast });
          setSelectedOption(
            Currencies.find((c) => c.value === data?.currency) || null
          );
        },
        onError: () => {
          toast.error("Failed to update currency", { id: loadingToast });
        },
      });
    },
    [mutation]
  );

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={userSettings.isFetching}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start"
              disabled={mutation.isPending}
            >
              {selectedOption ? <>{selectedOption.label}</> : <>Set Currency</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <OptionList
              setOpen={setOpen}
              setSelectedOption={(currency) => {
                setSelectedOption(currency);
                selectOption(currency);
              }}
            />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={mutation.isPending}
          >
            {selectedOption ? <>{selectedOption.label}</> : <>Set Currency</>}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <VisuallyHidden>
            <DrawerTitle>Set Currency</DrawerTitle>
          </VisuallyHidden>
          <div className="mt-4 border-t">
            <OptionList
              setOpen={setOpen}
              setSelectedOption={(currency) => {
                setSelectedOption(currency);
                selectOption(currency);
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  );
}

function OptionList({
  setOpen,
  setSelectedOption,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (currency: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter Currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value) => {
                const selectedCurrency = Currencies.find(
                  (curr) => curr.value === value
                );
                setSelectedOption(selectedCurrency || null);
                setOpen(false);
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
