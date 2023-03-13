import { getCellWidth, getDeltaSeconds, getMouse, SINK_RATE } from '../state/global'
import { getHeight, getWidth } from '../state/gui'
import { ICell } from '../types'
import { dist2 } from '../util/base'

export const sourceKernel = (cell: ICell) => {
  const {position: {x,y}} = cell
  return ({
    ...cell,
    color: {
      ...cell.color,
      red: y-1===Math.floor(getHeight()/3) && x-1===Math.floor(getWidth()/2) ? 1 : cell.color.red,
      green: y-1===Math.floor(getHeight()*2/3) && x-1===Math.floor(getWidth()/2) ? 1 : cell.color.green,
    }
  })
}
export const sinkKernel = (cell: ICell) => {
  const {color: {red,green,blue}} = cell
  return ({
    ...cell,
    color: {
      red: red*(SINK_RATE*getDeltaSeconds() + (1-getDeltaSeconds())),
      green: green*(SINK_RATE*getDeltaSeconds() + (1-getDeltaSeconds())),
      blue: blue*(SINK_RATE*getDeltaSeconds() + (1-getDeltaSeconds())),
    }
  })
}
export const velocitySource = (cell: ICell) => {
  const SOURCE_SPEED = 1
  const {position: {x,y}} = cell
  return {
    ...cell,
    velocity: {
      x: y-1===Math.floor(getHeight()/3)
        ? SOURCE_SPEED
        : y-1===Math.floor(getHeight()*2/3)
        ? -SOURCE_SPEED
        : cell.velocity.x,
      y: y-1===Math.floor(getHeight()/3)
        ? SOURCE_SPEED/5
        : y-1===Math.floor(getHeight()*2/3)
        ? -SOURCE_SPEED/5
        : cell.velocity.x,
    }
  }
}

export const mouseVelocitySource = (cell: ICell) => {
  const position = {
    x: cell.position.x*getCellWidth(),
    y: cell.position.y*getCellWidth(),
  }
  const d = Math.max(dist2(position, getMouse().position), getCellWidth())
  return {
    ...cell,
    velocity: {
      x: cell.velocity.x + getMouse().velocity.x/d,
      y: cell.velocity.y + getMouse().velocity.y/d,
    }
  }
}