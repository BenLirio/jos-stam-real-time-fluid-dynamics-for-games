import { getHeight, getWidth } from '../state/gui'

export const range = (n: number) => Array.from(Array(n).keys())
export const newGrid = () =>
  range(getHeight()).map(() =>
    range(getWidth()).map(() => ({
      density: 0,
      velocity: {
        x: 0,
        y: 0
      }
    })))
export const clip = (min: number, max: number) => (n: number) =>
  Math.min(Math.max(n, min), max)