export const formatCurrency = (num) =>
  Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

export const formatCompactedNumber = (num) =>
  Intl.NumberFormat("id-ID", {
    notation: "compact",
  }).format(num);

export const formatNumber = (num, withComma = false) =>
  Intl.NumberFormat("id-ID", {
    maximumFractionDigits: withComma ? 2 : 0,
  }).format(num);
