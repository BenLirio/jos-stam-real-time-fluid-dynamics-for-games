import { ICell, IGrid, ILoc } from '../types'

export const GRID_WIDTH = 20
export const GRID_HEIGHT = 10
export const CELL_WIDTH = 20
export const DIFFUSION_RATE = 1

let grid: IGrid
export const getGrid = () => grid
export const setGrid = (newGrid: IGrid) => grid = newGrid
export const updateCell = ({ loc, cell }: { loc: ILoc, cell: ICell }) => 
  grid[loc.x][loc.y] = cell


let prev: number = Date.now()
let delta: number
export const getDelta = () => delta
export const setDelta = () => {
  delta = Date.now() - prev
  prev = Date.now()
}
export const getDeltaSeconds = () => delta / 1000