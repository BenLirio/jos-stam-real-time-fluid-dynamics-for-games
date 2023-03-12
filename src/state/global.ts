import { ICell, IGrid, ILoc } from '../types'
import { mod } from '../util/range'
import { getHeight, getWidth } from './gui'

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
export const _getGrid = () => grid
export const _setGrid = (newGrid: IGrid) => grid = newGrid

const normalizeCords = ({x, y}: ILoc) => ({
  x: mod(x-1, getWidth()),
  y: mod(y-1, getHeight()),
})
export const getCell = (loc: ILoc) => grid[normalizeCords(loc).y][normalizeCords(loc).x]
export const getPrevCell = (loc: ILoc) => prevGrid[normalizeCords(loc).y][normalizeCords(loc).x]
export const setCell = (cell: ICell) =>
  grid[cell.position.y-1][cell.position.x-1] = cell


let prev: number = Date.now()
let delta: number
export const getDelta = () => delta
export const setDelta = () => {
  delta = Date.now() - prev
  prev = Date.now()
}
export const getDeltaSeconds = () => delta / 1000