import p5 from 'p5'
import { setCell, _setGrid, swapGrids } from '../state/global'
import { setWidthSlider, setHeightSlider, getWidth, getHeight } from '../state/gui'
import { newGrid, range } from '../util/range'
import { getLargestSize } from '../util/screenSize'

const setupGUI = (p: p5) => {
  setWidthSlider(p.createSlider(4, 64, 8, 1))
  setHeightSlider(p.createSlider(4, 64, 8, 1))
}

const setup = (p: p5) => {
  const { width, height } = getLargestSize(p)
  const canvas = p.createCanvas(width, height)
  canvas.style('display', 'block')
  canvas.style('border', '3px solid black')

  setupGUI(p)

  _setGrid(newGrid())
  swapGrids()
  _setGrid(newGrid())
  range(1, Math.ceil(getWidth())+1)
    .forEach(x => range(1, Math.ceil(getHeight())+1)
    .forEach(y => setCell({
        density: x < 5 && y < 5 ? 1 : 0,
        position: { x, y },
        velocity: { x: 20/y, y: 20/x }
      }
    )))
}

export default setup
