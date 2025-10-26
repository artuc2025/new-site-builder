export function snapToGrid(value: number, grid = 8): number {
  if (!grid || grid <= 0) return value
  return Math.round(value / grid) * grid
}


