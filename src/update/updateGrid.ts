import { DIFFUSION_RATE, getDeltaSeconds, getGrid, setGrid } from '../state/global'
import { getHeight, getWidth } from '../state/gui'
import { ILoc } from '../types'
import { clip, newGrid } from '../util/range'

const getNeighbors = ({x,y}: ILoc) => 
  [ { x: x - 1, y: y }
  , { x: x + 1, y: y }
  , { x: x, y: y - 1 }
  , { x: x, y: y + 1 }
  ].filter(({x,y}) =>
    x >= 0 && x < getWidth() &&
    y >= 0 && y < getHeight()
  )

const applyDiffusion = () => setGrid(newGrid().map((rows, y) => rows.map((_, x) => {
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

const applyAdvection = () => setGrid(newGrid().map((rows, y) => rows.map((_, x) => {
  const cur = getGrid()[y][x]
  const { velocity } = cur
  const clipX = clip(0.5, getWidth() - 0.5)
  const clipY = clip(0.5, getHeight() - 0.5)
  const source = {
    x: clipX(x - getDeltaSeconds()*velocity.x),
    y: clipY(y - getDeltaSeconds()*velocity.y)
  }
  const xIdx = Math.floor(source.x)
  const x0 = source.x - xIdx
  const x1 = 1 - x0
  const yIdx = Math.floor(source.y)
  const y0 = source.y - yIdx
  const y1 = 1 - y0

  return {
    ...cur
  }
})))

export const updateGrid = () => {
  if (getGrid().length !== getHeight() || getGrid()[0].length !== getWidth()) {
    setGrid(newGrid().map((row, y) => row.map((cell, x) => ({
      density: getGrid()[y]?.[x]?.density || 0,
      velocity: {
        x: getGrid()[y]?.[x]?.velocity.x || 0,
        y: getGrid()[y]?.[x]?.velocity.y || 0
      }}))))
  }
  applyDiffusion()
  applyAdvection()
}