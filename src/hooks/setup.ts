import p5 from 'p5'
import { GRID_HEIGHT, GRID_WIDTH, setGrid, updateCell } from '../state/global'
import { newGrid, range } from '../util/range'
import { getLargestSize } from '../util/screenSize'

const setup = (p: p5) => {
  const { width, height } = getLargestSize(p)
  const canvas = p.createCanvas(width, height)
  canvas.style('display', 'block')
  canvas.style('border', '3px solid black')

  setGrid(newGrid())
  range(Math.ceil(GRID_WIDTH / 2))
    .forEach(x => range(Math.ceil(GRID_HEIGHT / 2))
    .forEach(y => updateCell({ loc: { x, y }, cell: { density: 1 } })))
}

export default setup
