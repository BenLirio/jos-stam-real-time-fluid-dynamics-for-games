import p5 from 'p5'
import { CELL_WIDTH, getGrid } from '../state/global'

export const drawGrid = (p: p5) => {
  const grid = getGrid()
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      p.fill(0, 0, 0, cell.density * 255)
      p.rect(x * CELL_WIDTH, y * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH)
    })
  })
}