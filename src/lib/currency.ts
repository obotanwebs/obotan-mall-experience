// USD to GHS conversion (approximate, for display only)
export const USD_TO_GHS = 15;

export function ghs(amountUsd: number): string {
  const ghsAmount = amountUsd * USD_TO_GHS;
  return `GH₵${ghsAmount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function ghsRaw(amountUsd: number): number {
  return amountUsd * USD_TO_GHS;
}
