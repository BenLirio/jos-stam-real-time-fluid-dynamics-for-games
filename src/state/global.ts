import { ICell, IGrid, ILoc } from '../types'

export const DIFFUSION_RATE = 1

let advectionRate = 1
export const getAdvectionRate = () => advectionRate
export const setAdvectionRate = (newAdvectionRate: number) => advectionRate = newAdvectionRate

let cellWidth = 20
export const getCellWidth = () => cellWidth
export const setCellWidth = (newCellWidth: number) => cellWidth = newCellWidth

let prevGrid: IGrid
let grid: IGrid
export const getPrevGrid = () => prevGrid
export const swapGrids = () => {
  const tmp = prevGrid
  prevGrid = grid
  grid = tmp
}
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