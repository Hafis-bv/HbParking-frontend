export function getElapsedAndCost(startTime: Date, pricePerHour: number) {
  const diffMs = Date.now() - new Date(startTime).getTime();
  const diffMin = diffMs / (1000 * 60);
  const h = Math.floor(diffMin / 60);
  const m = Math.floor(diffMin % 60);

  const elapsed = h > 0 ? `${h}h ${m}m` : `${m}m`;

  let cost = 0;
  if (diffMin > 15) {
    const paidMinutes = diffMin - 15;
    const hours = Math.ceil(paidMinutes / 60);
    cost = hours * pricePerHour;
  }

  const isFree = diffMin <= 15;
  const freeMinLeft = isFree ? Math.ceil(15 - diffMin) : 0;

  return { elapsed, cost: cost.toFixed(1), isFree, freeMinLeft };
}
