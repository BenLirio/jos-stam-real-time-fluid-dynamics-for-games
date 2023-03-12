import { applyKernel, resizeGrid } from '../state/global'
import { blueAdvectionKernel, greenAdvectionKernel, redAdvectionKernel, velocityXAdvectionKernel, velocityYAdvectionKernel } from './advection'
import { blueDiffusionKernel, greenDiffusionKernel, redDiffusionKernel, velocityXDiffusionKernel, velocityYDiffusionKernel } from './diffusion'
import { sinkKernel, sourceKernel, velocitySource } from './source'

const sourceKernels =
  [ sourceKernel
  , sinkKernel
  , velocitySource
  ]

const colorKernels = 
  [ redDiffusionKernel
  , greenDiffusionKernel
  , blueDiffusionKernel
  , redAdvectionKernel
  , greenAdvectionKernel
  , blueAdvectionKernel
  ]

const velocityKernels  = 
  [ velocityXDiffusionKernel
  , velocityYDiffusionKernel
  , velocityXAdvectionKernel
  , velocityYAdvectionKernel
  ]

export const updateGrid = () => {
  resizeGrid()
  ;[
    ...sourceKernels,
    ...colorKernels,
    ...velocityKernels,
  ].forEach(applyKernel)
}