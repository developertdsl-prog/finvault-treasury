export const formatUsd = (num) => {
  if (num === undefined || num === null) return '$0';
  return '$' + Number(num).toLocaleString('en-US', { maximumFractionDigits: 0 });
};
