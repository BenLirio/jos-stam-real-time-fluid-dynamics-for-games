import p5 from 'p5'

let widthSlider: p5.Element
const getWidthSlider = () => widthSlider
export const setWidthSlider = (newWidthSlider: p5.Element) => widthSlider = newWidthSlider
export const getWidth = () => getWidthSlider().value() as number


let heightSlider: p5.Element
const getHeightSlider = () => heightSlider
export const setHeightSlider = (newHeightSlider: p5.Element) => heightSlider = newHeightSlider
export const getHeight = () => getHeightSlider().value() as number