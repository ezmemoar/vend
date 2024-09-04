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

export const formatNumber = (num) => Intl.NumberFormat("id-ID").format(num);
