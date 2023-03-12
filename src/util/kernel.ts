import { getPrevGrid, setCell, swapGrids, _getGrid } from '../state/global'
import { ICell } from '../types'

export const applyKernel = (f: (cell: ICell) => ICell) => {
  swapGrids()
  for (let y = 0; y < _getGrid().length; y++) {
    for (let x = 0; x < _getGrid()[y].length; x++) {
      setCell(f(getPrevGrid()[y][x]))
    }
  }
}