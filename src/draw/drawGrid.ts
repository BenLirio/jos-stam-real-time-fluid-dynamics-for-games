import p5 from 'p5'
import { getAdvectionRate, getCells, getCellWidth } from '../state/global'

const MAX_COLOR = 255
const drawCells = (p: p5) => getCells().forEach(({velocity, position, color: {red,green,blue} }) => {
      const d = {
        x: getCellWidth(),
        y: getCellWidth()
      }
      const pos = {
        x: position.x*d.x,
        y: position.y*d.y
      }
      p.push()
      p.noStroke()
      // p.stroke('white')
      p.fill(red*MAX_COLOR,green*MAX_COLOR,blue*MAX_COLOR)
      p.rect(pos.x, pos.y, d.x, d.y)
      p.pop()
})

export const drawVelocity = (p: p5) => getCells().forEach(({velocity, position, color: {red,green,blue} }) => {
      const d = {
        x: getCellWidth(),
        y: getCellWidth()
      }
      const pos = {
        x: position.x*d.x,
        y: position.y*d.y
      }
      p.push()
      p.stroke('white')
      p.translate(pos.x+d.x/2, pos.y+d.y/2)
      p.rotate(Math.atan2(velocity.y, velocity.x))
      const LENGTH_SCALE = 2
      const length = LENGTH_SCALE*Math.sqrt(velocity.x**2 + velocity.y**2)
      p.line(0,0,length,0)
      p.pop()
})

export const drawGrid = (p: p5) => {
  drawCells(p)
  // drawVelocity(p)
}