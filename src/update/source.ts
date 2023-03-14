import { COLOR_SINK_RATE, COLOR_SOURCE_RATE, getCell, getCellWidth, getDeltaSeconds, getElapsedSeconds, getMouse, VELOCITY_SINK_RATE } from '../state/global'
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
  const {color: {red,green,blue}, velocity: {x,y}} = cell
  const colorAlpha = COLOR_SINK_RATE*getDeltaSeconds() + (1-getDeltaSeconds())
  const velocityAlpha = VELOCITY_SINK_RATE*getDeltaSeconds() + (1-getDeltaSeconds())
  return ({
    ...cell,
    color: {
      red: red*colorAlpha,
      green: green*colorAlpha,
      blue: blue*colorAlpha,
    },
    velocity: {
      x: x*velocityAlpha,
      y: y*velocityAlpha,
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
export const mouseColorSource = (cell: ICell) => {
  const position = {
    x: (cell.position.x+0.5)*getCellWidth(),
    y: (cell.position.y+0.5)*getCellWidth(),
  }
  const d = Math.max(dist2(position, getMouse().position), getCellWidth()*10)
  const {color: {red,green,blue}} = cell
  // return {
  //   ...cell,
  //   color: {
  //     red: Math.abs(Math.sin(getElapsedSeconds()/7))*Math.min(1, red + COLOR_SOURCE_RATE/d),
  //     green: Math.abs(Math.sin(getElapsedSeconds()/5))*Math.min(1, green + COLOR_SOURCE_RATE/d),
  //     blue: Math.abs(Math.sin(getElapsedSeconds()/3))*Math.min(1, blue + COLOR_SOURCE_RATE/d),
  //   }
  // }
  return {
    ...cell,
    color: {
      red: Math.max(Math.min(1, (red + COLOR_SOURCE_RATE/d)*Math.abs(Math.sin(getElapsedSeconds()/7))), red),
      green: Math.max(Math.min(1, (green + COLOR_SOURCE_RATE/d)*Math.abs(Math.sin(getElapsedSeconds()/5))), green),
      blue: Math.max(Math.min(1, (blue + COLOR_SOURCE_RATE/d)*Math.abs(Math.sin(getElapsedSeconds()/3))), blue),
    }
  }
}