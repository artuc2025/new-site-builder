export function snapToGrid(value: number, grid = 8): number {
  if (!grid || grid <= 0) return value
  return Math.round(value / grid) * grid
}

export function clampToCanvas(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min
  return Math.min(Math.max(min, value), max)
}


