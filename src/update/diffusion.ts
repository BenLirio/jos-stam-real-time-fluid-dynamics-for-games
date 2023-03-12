import { DIFFUSION_RATE, getDeltaSeconds, getGrid } from '../state/global'
import { getHeight, getWidth } from '../state/gui'
import { ICell } from '../types'
import { add } from '../util/base'
import { mod } from '../util/range'

const get4NeighborCells = ({position: {x,y}}: ICell) =>
  [ { x: x - 1, y: y }
  , { x: x + 1, y: y }
  , { x: x, y: y - 1 }
  , { x: x, y: y + 1 }
  ].map(({x,y}) => ({
    x: mod(x, getWidth()),
    y: mod(y, getHeight())
  })).map(({x,y}) => getGrid()[y][x])

const makeDiffusionKernel = (f: (cell: ICell) => number, g: (cell: ICell, value: number) => ICell) =>
  (cell: ICell) => g(cell,
    f(cell)
    - getDeltaSeconds()*DIFFUSION_RATE*(f(cell) -
      get4NeighborCells(cell).map(f).reduce(add) / 4))

export const densityDiffusionKernel = makeDiffusionKernel(
  ({density}) => density,
  (cell, density) => ({...cell, density})
)
export const velocityXDiffusionKernel = makeDiffusionKernel(
  ({velocity: {x}}) => x,
  (cell, x) => ({...cell, velocity: {...cell.velocity, x}})
)
export const velocityYDiffusionKernel = makeDiffusionKernel(
  ({velocity: {y}}) => y,
  (cell, y) => ({...cell, velocity: {...cell.velocity, y}})
)