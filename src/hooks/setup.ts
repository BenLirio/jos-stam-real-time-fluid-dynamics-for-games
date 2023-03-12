import p5 from 'p5'
import { setGrid, updateCell } from '../state/global'
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

  setGrid(newGrid())
  range(Math.ceil(getWidth()))
    .forEach(x => range(Math.ceil(getHeight()))
    .forEach(y => updateCell({
      loc: { x, y },
      cell: {
        density: x < 5 && y < 5 ? 1 : 0,
        velocity: {
          x: x,
          y: y
        }
      }
    })))
}

export default setup
