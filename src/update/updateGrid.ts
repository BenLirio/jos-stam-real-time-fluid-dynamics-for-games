import { applyKernel, getCells, resizeGrid } from '../state/global'
import { densityAdvectionKernel } from './advection'
import { densityDiffusionKernel, velocityXDiffusionKernel, velocityYDiffusionKernel } from './diffusion'

const updateDensity = () => {
  applyKernel(densityDiffusionKernel)
  applyKernel(densityAdvectionKernel)
}
const updateVelocity = () => {
  applyKernel(velocityXDiffusionKernel)
  applyKernel(velocityYDiffusionKernel)
}

export const updateGrid = () => {
  resizeGrid()
  updateDensity()
  updateVelocity()
}