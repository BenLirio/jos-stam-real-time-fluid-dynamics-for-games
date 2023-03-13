import { getCell } from '../state/global'
import { getHeight, getWidth } from '../state/gui'
import { ICell } from '../types'
import { add } from '../util/base'
import { get4NeighborCells } from '../util/kernelHelpers'

const xVelocityDerivative = ({position: {x,y}}: ICell) =>
  getCell({x: x+1, y}).velocity.x - getCell({x: x-1, y}).velocity.x
const yVelocityDerivative = ({position: {x,y}}: ICell) =>
  getCell({x, y: y+1}).velocity.y - getCell({x, y: y-1}).velocity.y
const xPressureDerivative = ({position: {x,y}}: ICell) =>
  getCell({x: x+1, y}).pressure - getCell({x: x-1, y}).pressure
const yPressureDerivative = ({position: {x,y}}: ICell) =>
  getCell({x, y: y+1}).pressure - getCell({x, y: y-1}).pressure

export const solveProjectKernel = (cell: ICell) => {
  const d = {
    x: xVelocityDerivative(cell),
    y: yVelocityDerivative(cell),
  }
  const h = 1/(getHeight()*getWidth())
  const div = -0.5*h*(d.x + d.y)
  const neighborsPressure = get4NeighborCells(cell).map(({pressure}) => pressure)
  const pressure = (div + neighborsPressure.reduce(add))/4
  return {
    ...cell,
    pressure,
  }
}
export const writeProjectKernel = (cell: ICell) => {
  const {velocity: {x, y}} = cell
  const h = 1/(getHeight()*getWidth())
  return {
    ...cell,
    velocity: {
      x: x - 0.5*xPressureDerivative(cell)/h,
      y: y - 0.5*yPressureDerivative(cell)/h,
    }
  }
}
export const prepareProjectKernel = (cell: ICell) => ({
  ...cell,
  pressure: 0,
})
