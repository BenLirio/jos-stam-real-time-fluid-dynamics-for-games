import { DIFFUSION_RATE, getAdvectionRate, getCellWidth, getDeltaSeconds, getGrid, setGrid } from '../state/global'
import { getHeight, getWidth } from '../state/gui'
import {  ICell, ILoc } from '../types'
import { add } from '../util/base'
import { applyKernel } from '../util/kernel'
import { clip, mod, newGrid, range } from '../util/range'

const getNeighbors = ({x,y}: ILoc) => 
  [ { x: x - 1, y: y }
  , { x: x + 1, y: y }
  , { x: x, y: y - 1 }
  , { x: x, y: y + 1 }
  ].map(({x,y}) => ({
    x: mod(x, getWidth()),
    y: mod(y, getHeight())
  }))

const applyDensityDiffusion = () => setGrid(newGrid().map((rows, y) => rows.map((_, x) => {
  const neighbors = getNeighbors({x,y})
  const averageNeighbors = neighbors
    .map(({x,y}) => getGrid()[y][x].density / neighbors.length)
    .reduce((a,b) => a + b, 0)
  const cur = getGrid()[y][x]
  const density = cur.density - getDeltaSeconds()*DIFFUSION_RATE*(cur.density - averageNeighbors)
  return { 
    ...cur,
    density
  }})))

const get4NeighborCells = ({x,y}: ILoc) =>
  [ { x: x - 1, y: y }
  , { x: x + 1, y: y }
  , { x: x, y: y - 1 }
  , { x: x, y: y + 1 }
  ].map(({x,y}) => ({
    x: mod(x, getWidth()),
    y: mod(y, getHeight())
  })).map(({x,y}) => getGrid()[y][x])

const densityDiffusionKernel = (cell: ICell) => {
  const { position, density } = cell
  return {
    ...cell,
    density: density - getDeltaSeconds()*DIFFUSION_RATE*(density -
      get4NeighborCells(position)
        .map(({density}) => density)
        .reduce(add) / 4)
  }
}

const applyVelocityYDiffusion = () => setGrid(newGrid().map((rows, y) => rows.map((_, x) => {
  const neighbors = getNeighbors({x,y})
  const averageNeighbors = neighbors
    .map(({x,y}) => getGrid()[y][x].velocity.y / neighbors.length)
    .reduce((a,b) => a + b, 0)
  const cur = getGrid()[y][x]
  const velocityY = cur.velocity.y - getDeltaSeconds()*DIFFUSION_RATE*(cur.velocity.y - averageNeighbors)
  return { 
    ...cur,
    velocity: {
      ...cur.velocity,
      y: velocityY
    }
  }})))

const applyVelocityXDiffusion = () => setGrid(newGrid().map((rows, y) => rows.map((_, x) => {
  const neighbors = getNeighbors({x,y})
  const averageNeighbors = neighbors
    .map(({x,y}) => getGrid()[y][x].velocity.x / neighbors.length)
    .reduce((a,b) => a + b, 0)
  const cur = getGrid()[y][x]
  const velocityX = cur.velocity.x - getDeltaSeconds()*DIFFUSION_RATE*(cur.velocity.x - averageNeighbors)
  return { 
    ...cur,
    velocity: {
      ...cur.velocity,
      x: velocityX
    }
  }})))

const applyAdvection = () => setGrid(range(1, getHeight()+1).map(y => range(1, getWidth()+1).map(x => {
  const g = (y: number, x: number) => getGrid()[mod(y-1, getHeight())][mod(x-1, getWidth())]
  const { velocity } = g(y,x)

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

  const density = range(2).map(yOff => range(2).map(xOff => 
    weights[yOff][xOff] * g(yIdx+yOff, xIdx+xOff).density
  )).flat().reduce((a,b) => a + b, 0)
  
  return {
    ...g(y,x),
    density
  }
})))

const updateDensity = () => {
  applyKernel(densityDiffusionKernel)
  applyAdvection()
}
const updateVelocity = () => {
  applyVelocityYDiffusion()
  applyVelocityXDiffusion()
}

const fillUndefined = () => {
  if (getGrid().length !== getHeight() || getGrid()[0].length !== getWidth()) {
    setGrid(newGrid().map((row, y) => row.map((cell, x) => ({
      density: getGrid()[y]?.[x]?.density || 0,
      position: {
        x: getGrid()[y]?.[x]?.position.x || 0,
        y: getGrid()[y]?.[x]?.position.y || 0
      },
      velocity: {
        x: getGrid()[y]?.[x]?.velocity.x || 0,
        y: getGrid()[y]?.[x]?.velocity.y || 0
      }}))))
  }
}

export const updateGrid = () => {
  fillUndefined()
  updateDensity()
  // updateVelocity()
}