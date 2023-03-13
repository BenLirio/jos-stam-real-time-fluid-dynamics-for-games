import { DIFFUSION_RATE, getCell, getDeltaSeconds } from '../state/global'
import { getHeight, getWidth } from '../state/gui'
import { ICell } from '../types'
import { add } from '../util/base'
import { get4NeighborCells } from '../util/kernelHelpers'

const diffuseFactor = () => DIFFUSION_RATE*getDeltaSeconds()*getWidth()*getHeight()
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