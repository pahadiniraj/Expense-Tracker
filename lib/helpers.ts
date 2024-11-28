import { Currencies } from "./currencies";

export function DateToUTCDate(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}

export function GetFormatterForCurrency(currency: string) {
  const locale =
    Currencies.find((c) => c.value === currency)?.locale || "en-US";
  const safeLocale = ["ne", "ne-NP"].includes(locale) ? "en-US" : locale;
  return new Intl.NumberFormat(safeLocale, {
    style: "currency",
    currency,
  });
}
