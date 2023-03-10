import p5 from 'p5'
import { drawGrid } from '../draw/drawGrid'
import { setDelta } from '../state/global'
import { updateGrid } from '../update/updateGrid'

const draw = (p: p5) => {
  setDelta()
  p.background(255)
  drawGrid(p)
  updateGrid()
}

export default draw
