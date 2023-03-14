import { applyKernel, resizeGrid } from '../state/global'
import { ICell } from '../types'
import {
  blueAdvectionKernel,
  greenAdvectionKernel,
  redAdvectionKernel,
  velocityXAdvectionKernel,
  velocityYAdvectionKernel
} from './advection'
import {
  stableBlueDiffusionKernel,
  stableGreenDiffusionKernel,
  stableRedDiffusionKernel,
  stableVelocityXDiffusionKernel,
  stableVelocityYDiffusionKernel
} from './diffusion'
import { prepareProjectKernel, solveProjectKernel, writeProjectKernel } from './project'
import { mouseColorSource, mouseVelocitySource, sinkKernel, sourceKernel } from './source'

const GUASS_SEIDEL_ITERATIONS = 4

const useKernel = (kernel: (cell: ICell) => ICell, iterations = 1, swap = true) => ({
  kernel,
  iterations,
  swap
})

/* Source */
const sourceKernels = [
  // sourceKernel,
  sinkKernel,
  mouseVelocitySource,
  mouseColorSource,
  // velocitySource
].map(k => useKernel(k))


/* Color */
const colorDiffusionKernels = [
  stableRedDiffusionKernel,
  stableGreenDiffusionKernel,
  stableBlueDiffusionKernel,
].map(k => useKernel(k, GUASS_SEIDEL_ITERATIONS))
const colorAdvectionKernels = [
  redAdvectionKernel,
  greenAdvectionKernel,
  blueAdvectionKernel
].map(k => useKernel(k))
const colorKernels = [
  ...colorDiffusionKernels,
  ...colorAdvectionKernels,
]

/* Project */
const projectKernels = [
  useKernel(prepareProjectKernel, 1),
  useKernel(prepareProjectKernel, 1),
  useKernel(solveProjectKernel, GUASS_SEIDEL_ITERATIONS, false),
  useKernel(writeProjectKernel, 1, false)
]

/* Velocity */
const velocityDiffusionKernels = [
  stableVelocityXDiffusionKernel,
  stableVelocityYDiffusionKernel
].map(k => useKernel(k, GUASS_SEIDEL_ITERATIONS))
const velocityAdvectionKernels = [
  velocityXAdvectionKernel,
  velocityYAdvectionKernel
].map(k => useKernel(k))
const velocityKernels = [
  ...velocityDiffusionKernels,
  ...projectKernels,
  ...velocityAdvectionKernels,
  ...projectKernels
]

export const updateGrid = () => {
  resizeGrid()
  ;[
    ...sourceKernels,
    ...colorKernels,
    ...velocityKernels,
  ].forEach(({kernel, iterations, swap}) => applyKernel(kernel, iterations, swap))
}