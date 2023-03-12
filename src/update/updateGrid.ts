import { applyKernel, resizeGrid } from '../state/global'
import { blueAdvectionKernel, greenAdvectionKernel, redAdvectionKernel } from './advection'
import { blueDiffusionKernel, greenDiffusionKernel, redDiffusionKernel, velocityXDiffusionKernel, velocityYDiffusionKernel } from './diffusion'
import { sinkKernel, sourceKernel, velocitySource } from './source'

const updateSource = () => {
  [
    sourceKernel,
    sinkKernel,
    velocitySource
  ].forEach(applyKernel)
}

const updateDensity = () => {
  [
    redDiffusionKernel,
    greenDiffusionKernel,
    blueDiffusionKernel,
    redAdvectionKernel,
    greenAdvectionKernel,
    blueAdvectionKernel
  ].forEach(applyKernel)
}
const updateVelocity = () => {
  applyKernel(velocityXDiffusionKernel)
  applyKernel(velocityYDiffusionKernel)
}

export const updateGrid = () => {
  resizeGrid()
  updateSource()
  updateDensity()
  updateVelocity()
}