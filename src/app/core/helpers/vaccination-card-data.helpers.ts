export function getProgressPercentage(numerator: number, denominator: number) {
  const percentageValue = ((numerator / denominator) * 100).toFixed(0);
  return parseInt(percentageValue, 10);
}
