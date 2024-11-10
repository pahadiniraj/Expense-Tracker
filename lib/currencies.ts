export const Currencies = [
  { value: "NPR", label: "रू Nepali Rupee", locale: "ne-NP" },
  { value: "INR", label: "₹ Indian Rupee", locale: "hi-IN" },
  { value: "AUD", label: "$ Australian Dollar", locale: "en-AU" },
  { value: "USD", label: "$ US Dollar", locale: "en-US" },
  { value: "JPY", label: "¥ Japanese Yen", locale: "ja-JP" },
];

export type Currency = (typeof Currencies)[number];
