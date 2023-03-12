import { getGrid, getPrevGrid, swapGrids } from '../state/global'
import { ICell } from '../types'

export const applyKernel = (f: (cell: ICell) => ICell) => {
  swapGrids()
  const prevGrid = getPrevGrid()
  const grid = getGrid()
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      grid[y][x] = f(prevGrid[y][x])
    }
  }
}