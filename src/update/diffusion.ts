import { DIFFUSION_RATE, getDeltaSeconds, getPrevCell } from '../state/global'
import { ICell } from '../types'
import { add } from '../util/base'

const get4NeighborCells = ({position: {x,y}}: ICell) =>
  [ { x: x - 1, y: y }
  , { x: x + 1, y: y }
  , { x: x, y: y - 1 }
  , { x: x, y: y + 1 }
  ].map(getPrevCell)

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