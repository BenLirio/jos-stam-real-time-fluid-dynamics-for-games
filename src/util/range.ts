export const range = (x: number, y?: number, step = 1) => {
  const start = y ? x : 0
  const end = y ? y : x
  const n = Math.floor((end - start) / step)
  return Array(n).fill(0).map((_, i) => start + i * step)
}
export const mod = (n: number, m: number) => ((n % m) + m) % m

export const clip = (min: number, max: number) => (n: number) =>
  Math.min(Math.max(n, min), max)