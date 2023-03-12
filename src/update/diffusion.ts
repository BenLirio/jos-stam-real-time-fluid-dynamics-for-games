import { DIFFUSION_RATE, getCell, getDeltaSeconds, getPrevCell } from '../state/global'
import { getHeight, getWidth } from '../state/gui'
import { ICell } from '../types'
import { add } from '../util/base'

const get4PrevNeighborCells = ({position: {x,y}}: ICell) =>
  [ { x: x - 1, y: y }
  , { x: x + 1, y: y }
  , { x: x, y: y - 1 }
  , { x: x, y: y + 1 }
  ].map(getPrevCell)

const get4NeighborCells = ({position: {x,y}}: ICell) =>
  [ { x: x - 1, y: y }
  , { x: x + 1, y: y }
  , { x: x, y: y - 1 }
  , { x: x, y: y + 1 }
  ].map(getCell)

const diffuseFactor = () => DIFFUSION_RATE*getDeltaSeconds()*getWidth()*getHeight()
const makeDiffusionKernel = (f: (cell: ICell) => number, g: (cell: ICell, value: number) => ICell) =>
  (cell: ICell) => g(cell,
    f(cell)
    - diffuseFactor()*(f(cell)
    - get4PrevNeighborCells(cell).map(f).reduce(add) / 4))

const makeStableDiffusionKernel = (f: (cell: ICell) => number, g: (cell: ICell, value: number) => ICell) =>
  (cell: ICell) => g(cell,
    (f(cell) + diffuseFactor()*get4NeighborCells(cell).map(f).reduce(add)/4) / (1+diffuseFactor()))

export const stableRedDiffusionKernel = makeStableDiffusionKernel(
  ({color: {red}}) => red,
  (cell, red) => ({...cell, color: {...cell.color, red}})
)
export const stableGreenDiffusionKernel = makeStableDiffusionKernel(
  ({color: {green}}) => green,
  (cell, green) => ({...cell, color: {...cell.color, green}})
)
export const stableBlueDiffusionKernel = makeStableDiffusionKernel(
  ({color: {blue}}) => blue,
  (cell, blue) => ({...cell, color: {...cell.color, blue}})
)
export const stableVelocityXDiffusionKernel = makeStableDiffusionKernel(
  ({velocity: {x}}) => x,
  (cell, x) => ({...cell, velocity: {...cell.velocity, x}})
)
export const stableVelocityYDiffusionKernel = makeStableDiffusionKernel(
  ({velocity: {y}}) => y,
  (cell, y) => ({...cell, velocity: {...cell.velocity, y}})
)

export const redDiffusionKernel = makeDiffusionKernel(
  ({color: {red}}) => red,
  (cell, red) => ({...cell, color: {...cell.color, red}})
)
export const greenDiffusionKernel = makeDiffusionKernel(
  ({color: {green}}) => green,
  (cell, green) => ({...cell, color: {...cell.color, green}})
)
export const blueDiffusionKernel = makeDiffusionKernel(
  ({color: {blue}}) => blue,
  (cell, blue) => ({...cell, color: {...cell.color, blue}})
)

export const velocityXDiffusionKernel = makeDiffusionKernel(
  ({velocity: {x}}) => x,
  (cell, x) => ({...cell, velocity: {...cell.velocity, x}})
)
export const velocityYDiffusionKernel = makeDiffusionKernel(
  ({velocity: {y}}) => y,
  (cell, y) => ({...cell, velocity: {...cell.velocity, y}})
)