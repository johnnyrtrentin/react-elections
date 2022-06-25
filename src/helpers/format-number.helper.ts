export const formatNumber = (number: number): string =>
  number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
  });
