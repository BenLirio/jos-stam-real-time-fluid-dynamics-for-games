import { ICell, IGrid, ILoc, IMouse } from '../types'
import { mod } from '../util/range'
import { getHeight, getWidth } from './gui'

export const SINK_RATE = 0.99
export const DIFFUSION_RATE = 0.01

let advectionRate = 1
export const getAdvectionRate = () => advectionRate
export const setAdvectionRate = (newAdvectionRate: number) => advectionRate = newAdvectionRate

let cellWidth = 20
export const getCellWidth = () => cellWidth
export const setCellWidth = (newCellWidth: number) => cellWidth = newCellWidth

let prevGrid: IGrid = []
let grid: IGrid = []
export const swapGrids = () => {
  const tmp = prevGrid
  prevGrid = grid
  grid = tmp
}
const normalizeCords = ({x, y}: ILoc) => ({
  x: mod(x-1, getWidth()),
  y: mod(y-1, getHeight()),
})
export const getCell = (loc: ILoc) => grid[normalizeCords(loc).y][normalizeCords(loc).x]
export const getPrevCell = (loc: ILoc) => prevGrid[normalizeCords(loc).y][normalizeCords(loc).x]
export const setCell = (cell: ICell) => {
  grid[cell.position.y-1][cell.position.x-1] = cell
}

export const applyKernel = (f: (cell: ICell) => ICell, iterations = 1) => {
  swapGrids()
  for (let k = 0; k < iterations; k++) {
    for (let y = 1; y <= grid.length; y++) {
      for (let x = 1; x <= grid[y-1].length; x++) {
        setCell(f(getPrevCell({x,y})))
      }
    }
  }
}

export const getCells = () => grid.flat()
const newGrid = () => Array(getHeight()).fill(0).map((_,y) => Array(getWidth()).fill(0).map((_,x) => ({
  position: {x: x+1, y: y+1},
  velocity: {
    x: 0,
    y: 0,
  },
  color: {
    red: 0,
    green: 0,
    blue: 0,
  },
  pressure: 0,
})))

export const resizeGrid = () => {
  if (grid.length === getHeight() && grid[0].length === getWidth()) return
  grid = newGrid()
  swapGrids()
  grid = newGrid()
}

let prev: number = Date.now()
let delta: number
export const getDelta = () => delta
export const setDelta = () => {
  delta = Date.now() - prev
  prev = Date.now()
}
export const getDeltaSeconds = () => delta / 1000

let mouse: IMouse = {
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
}
export const getMouse = () => mouse
export const setMouse = (newMouse: IMouse) => mouse = newMouse