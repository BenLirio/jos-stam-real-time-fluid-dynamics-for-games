import { DIFFUSION_RATE, getDeltaSeconds, getGrid, GRID_HEIGHT, GRID_WIDTH, setGrid } from '../state/global'
import { ILoc } from '../types'
import { newGrid } from '../util/range'

const getNeighbors = ({x,y}: ILoc) => 
  [ { x: x - 1, y: y }
  , { x: x + 1, y: y }
  , { x: x, y: y - 1 }
  , { x: x, y: y + 1 }
  ].filter(({x,y}) =>
    x >= 0 && x < GRID_WIDTH &&
    y >= 0 && y < GRID_HEIGHT
  )

const applyDiffusion = () => {
  const prevGrid = getGrid()
  const grid = newGrid().map((rows, y) => 
    rows.map((_, x) => {
      const neighbors = getNeighbors({x,y})
       const averageNeighbors = neighbors
        .map(({x,y}) => prevGrid[y][x].density / neighbors.length)
        .reduce((a,b) => a + b, 0)
      const cur = prevGrid[y][x]
      const density = cur.density - getDeltaSeconds()*DIFFUSION_RATE*(cur.density - averageNeighbors)
      return { 
        ...cur,
        density
      }
    })
  )
  setGrid(grid)
}
export const updateGrid = () => {
  applyDiffusion()
}