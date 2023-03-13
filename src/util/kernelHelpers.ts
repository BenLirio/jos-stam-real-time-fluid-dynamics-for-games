import { getCell } from '../state/global'
import { ICell } from '../types'

export const get4NeighborCells = ({position: {x,y}}: ICell) =>
  [ { x: x - 1, y: y }
  , { x: x + 1, y: y }
  , { x: x, y: y - 1 }
  , { x: x, y: y + 1 }
  ].map(getCell)