export const filterNumberOnly = (num: number) => `${num}`.replace(/\D/g, "");

export const formatNumber = (num: number, config: Intl.NumberFormatOptions) =>
  Intl.NumberFormat("id-ID", config).format(num);

export const formatCurrency = (num: number, config: Intl.NumberFormatOptions) =>
  Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    ...config,
  }).format(num);

export const formatCompactedNumber = (
  num: number,
  config: Intl.NumberFormatOptions
) =>
  Intl.NumberFormat("id-ID", {
    notation: "compact",
    ...config,
  }).format(num);

export const createPercentage = (num: number, total: number) =>
  +num + +total !== 0
    ? formatNumber((+num / +total) * 100, {
        minimumFractionDigits: 2,
      })
    : 0;
