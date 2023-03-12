import { applyKernel, resizeGrid } from '../state/global'
import { ICell } from '../types'
import { blueAdvectionKernel, greenAdvectionKernel, redAdvectionKernel, velocityXAdvectionKernel, velocityYAdvectionKernel } from './advection'
import { blueDiffusionKernel, greenDiffusionKernel, redDiffusionKernel, stableBlueDiffusionKernel, stableGreenDiffusionKernel, stableRedDiffusionKernel, stableVelocityXDiffusionKernel, stableVelocityYDiffusionKernel, velocityXDiffusionKernel, velocityYDiffusionKernel } from './diffusion'
import { sinkKernel, sourceKernel, velocitySource } from './source'

const useKernel = (kernel: (cell: ICell) => ICell, iterations = 1) => ({
  kernel,
  iterations,
})

const sourceKernels =
  [ sourceKernel
  , sinkKernel
  , velocitySource
  ].map(k => useKernel(k))

/* Color */
const colorDiffusionKernels = [
    stableRedDiffusionKernel,
    stableGreenDiffusionKernel,
    stableBlueDiffusionKernel,
].map(k => useKernel(k, 10))
const colorAdvectionKernels = [
  redAdvectionKernel,
  greenAdvectionKernel,
  blueAdvectionKernel
].map(k => useKernel(k))
const colorKernels = [
  ...colorDiffusionKernels,
  ...colorAdvectionKernels,
]

/* Velocity */
const velocityDiffusionKernels = [
  stableVelocityXDiffusionKernel,
  stableVelocityYDiffusionKernel
].map(k => useKernel(k, 10))
const velocityAdvectionKernels = [
  velocityXAdvectionKernel,
  velocityYAdvectionKernel
].map(k => useKernel(k))
const velocityKernels = [
  ...velocityDiffusionKernels,
  ...velocityAdvectionKernels,
]

export const updateGrid = () => {
  resizeGrid()
  ;[
    ...sourceKernels,
    ...colorKernels,
    ...velocityKernels,
  ].forEach(({kernel, iterations}) => applyKernel(kernel, iterations))
}