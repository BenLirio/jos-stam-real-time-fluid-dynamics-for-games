import { getAdvectionRate, getCellWidth, getDeltaSeconds, getPrevCell } from '../state/global'
import { getHeight, getWidth } from '../state/gui'
import { ICell } from '../types'
import { clip, range } from '../util/range'

export const redAdvectionKernel = (cell: ICell) => {
  const {velocity, position: {x,y} } = cell
  const d = {
    x: getCellWidth(),
    y: getCellWidth(),
    t: getDeltaSeconds()
  }
  const clipX = clip(0.5, getWidth() + 0.5)
  const clipY = clip(0.5, getHeight() + 0.5)
  const s = {
    x: clipX(x - d.t*getAdvectionRate()*velocity.x/d.x),
    y: clipY(y - d.t*getAdvectionRate()*velocity.y/d.y)
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

  const red = range(2).map(yOff => range(2).map(xOff => 
    weights[yOff][xOff] * getPrevCell({
      y: yIdx+yOff,
      x: xIdx+xOff
    }).color.red
  )).flat().reduce((a,b) => a + b, 0)
  
  return {
    ...cell,
    color: {
      ...cell.color,
      red
    }
  }

}

export const greenAdvectionKernel = (cell: ICell) => {
  const {velocity, position: {x,y} } = cell
  const d = {
    x: getCellWidth(),
    y: getCellWidth(),
    t: getDeltaSeconds()
  }
  const clipX = clip(0.5, getWidth() + 0.5)
  const clipY = clip(0.5, getHeight() + 0.5)
  const s = {
    x: clipX(x - d.t*getAdvectionRate()*velocity.x/d.x),
    y: clipY(y - d.t*getAdvectionRate()*velocity.y/d.y)
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

  const green = range(2).map(yOff => range(2).map(xOff => 
    weights[yOff][xOff] * getPrevCell({
      y: yIdx+yOff,
      x: xIdx+xOff
    }).color.green
  )).flat().reduce((a,b) => a + b, 0)
  
  return {
    ...cell,
    color: {
      ...cell.color,
      green
    }
  }

}

export const blueAdvectionKernel = (cell: ICell) => {
  const {velocity, position: {x,y} } = cell
  const d = {
    x: getCellWidth(),
    y: getCellWidth(),
    t: getDeltaSeconds()
  }
  const clipX = clip(0.5, getWidth() + 0.5)
  const clipY = clip(0.5, getHeight() + 0.5)
  const s = {
    x: clipX(x - d.t*getAdvectionRate()*velocity.x/d.x),
    y: clipY(y - d.t*getAdvectionRate()*velocity.y/d.y)
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

  const blue = range(2).map(yOff => range(2).map(xOff => 
    weights[yOff][xOff] * getPrevCell({
      y: yIdx+yOff,
      x: xIdx+xOff
    }).color.blue
  )).flat().reduce((a,b) => a + b, 0)
  
  return {
    ...cell,
    color: {
      ...cell.color,
      blue
    }
  }

}
