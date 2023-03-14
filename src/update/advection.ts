import { getAdvectionRate, getCellWidth, getDeltaSeconds, getPrevCell } from '../state/global'
import { getHeight, getWidth } from '../state/gui'
import { ICell } from '../types'
import { clip, range } from '../util/range'

const makeAdvectionKernel = (f: (cell: ICell) => number, g: (cell: ICell, value: number) => ICell) => (cell: ICell) => {
  const {velocity, position: {x,y} } = cell
  const d = {
    x: getCellWidth(),
    y: getCellWidth(),
    t: getDeltaSeconds()*getWidth()*getHeight()
  }
  const clipX = clip(0.5, getWidth() + 0.5)
  const clipY = clip(0.5, getHeight() + 0.5)
  const s = {
    x: clipX(x - d.t*getAdvectionRate()*velocity.x),
    y: clipY(y - d.t*getAdvectionRate()*velocity.y)
  }
  const yIdx = Math.floor(s.y)
  const xIdx = Math.floor(s.x)
  const y1 = (s.y - yIdx)
  const x1 = (s.x - xIdx)
  const y0 = 1 - y1
  const x0 = 1 - x1
  const weights = [
    [y0*x0,y0*x1],
    [y1*x0,y1*x1]
  ]

  return g(cell, 
  range(2).map(yOff => range(2).map(xOff => 
    weights[yOff][xOff] * f(getPrevCell({
      y: yIdx+yOff,
      x: xIdx+xOff
    }))
  )).flat().reduce((a,b) => a + b, 0))
}

export const redAdvectionKernel = makeAdvectionKernel(
  ({color: {red}}) => red,
  (cell, red) => ({ ...cell, color: { ...cell.color, red }})
)
export const greenAdvectionKernel = makeAdvectionKernel(
  ({color: {green}}) => green,
  (cell, green) => ({ ...cell, color: { ...cell.color, green }})
)
export const blueAdvectionKernel = makeAdvectionKernel(
  ({color: {blue}}) => blue,
  (cell, blue) => ({ ...cell, color: { ...cell.color, blue }})
)
export const velocityXAdvectionKernel = makeAdvectionKernel(
  ({velocity: {x}}) => x,
  (cell, x) => ({ ...cell, velocity: { ...cell.velocity, x }})
)
export const velocityYAdvectionKernel = makeAdvectionKernel(
  ({velocity: {y}}) => y,
  (cell, y) => ({ ...cell, velocity: { ...cell.velocity, y }})
)
