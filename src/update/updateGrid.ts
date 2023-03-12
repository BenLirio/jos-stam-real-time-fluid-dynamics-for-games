import { _getGrid, _setGrid } from '../state/global'
import { getHeight, getWidth } from '../state/gui'
import { applyKernel } from '../util/kernel'
import { newGrid } from '../util/range'
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

const fillUndefined = () => {
  if (_getGrid().length !== getHeight() || _getGrid()[0].length !== getWidth()) {
    _setGrid(newGrid().map((row, y) => row.map((cell, x) => ({
      density: _getGrid()[y]?.[x]?.density || 0,
      position: {
        x: _getGrid()[y]?.[x]?.position.x || 0,
        y: _getGrid()[y]?.[x]?.position.y || 0
      },
      velocity: {
        x: _getGrid()[y]?.[x]?.velocity.x || 0,
        y: _getGrid()[y]?.[x]?.velocity.y || 0
      }}))))
  }
}

export const updateGrid = () => {
  fillUndefined()
  updateDensity()
  updateVelocity()
}