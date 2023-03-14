import p5 from 'p5'
import { getCells, resizeGrid, setCell } from '../state/global'
import { setWidthSlider, setHeightSlider, getWidth } from '../state/gui'
import { ICell } from '../types'
import { range } from '../util/range'
import { getLargestSize } from '../util/screenSize'

const setupGUI = (p: p5) => {
  setWidthSlider(p.createSlider(4, 64, 32, 1))
  setHeightSlider(p.createSlider(4, 64, 16, 1))
}

const setup = (p: p5) => {
  const { width, height } = getLargestSize(p)
  const canvas = p.createCanvas(width, height)
  canvas.style('display', 'block')
  canvas.style('border', '3px solid black')

  setupGUI(p)
  resizeGrid()
}

export default setup
