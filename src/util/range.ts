import { GRID_HEIGHT, GRID_WIDTH } from '../state/global'

export const range = (n: number) => Array.from(Array(n).keys())
export const newGrid = () => range(GRID_HEIGHT).map(() => range(GRID_WIDTH).map(() => ({ density: 0 })))