import p5 from 'p5'
import { getCells, getCellWidth } from '../state/global'

export const drawGrid = (p: p5) => getCells().forEach(({velocity, position, density}) => {
      const d = {
        x: getCellWidth(),
        y: getCellWidth()
      }
      const pos = {
        x: position.x*d.x,
        y: position.y*d.y
      }
      p.push()
      p.fill(0, 0, 0, density * 255)
      p.rect(pos.x, pos.y, d.x, d.y)
      p.fill('black')
      p.line(
        pos.x+d.x/2,
        pos.y+d.y/2,
        pos.x+d.x/2 + velocity.x,
        pos.y+d.y/2 + velocity.y
      )
      p.pop()
})