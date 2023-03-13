import p5 from 'p5'
import { drawGrid } from '../draw/drawGrid'
import { getDeltaSeconds, getMouse, setDelta, setMouse } from '../state/global'
import { updateGrid } from '../update/updateGrid'

const updateMouse = (p: p5) => {
  const { mouseX, mouseY } = p
  setMouse({
    position: { x: mouseX, y: mouseY },
    velocity: {
      x: (mouseX - getMouse().position.x) / getDeltaSeconds(),
      y: (mouseY - getMouse().position.y) / getDeltaSeconds()
    }
  })
}


const draw = (p: p5) => {
  setDelta()
  p.background(255)
  drawGrid(p)
  updateMouse(p)
  updateGrid()
}

export default draw
