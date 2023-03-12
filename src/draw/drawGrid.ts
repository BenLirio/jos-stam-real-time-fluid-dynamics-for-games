import p5 from 'p5'
import { getCellWidth, getDeltaSeconds, getGrid } from '../state/global'

export const drawGrid = (p: p5) => {
  const grid = getGrid()
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      const d = {
        x: getCellWidth(),
        y: getCellWidth()
      }
      const pos = {
        x: x*d.x,
        y: y*d.y
      }
      p.push()
      p.fill(0, 0, 0, cell.density * 255)
      p.rect(pos.x, pos.y, d.x, d.y)
      p.fill('black')
      p.line(
        pos.x+d.x/2,
        pos.y+d.y/2,
        pos.x+d.x/2 + cell.velocity.x,
        pos.y+d.y/2 + cell.velocity.y
      )
      p.pop()
    })
  })
}