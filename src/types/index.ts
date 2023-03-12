export interface IVec2 {
  x: number
  y: number
}
export enum Dims {
  X = 'x',
  Y = 'y'
}

export type ILoc = IVec2

export interface IColor {
  red: number
  green: number
  blue: number
}

export interface ICell {
  color: IColor
  position: ILoc
  velocity: IVec2
}
export enum CellKeys {
  DENSITY = 'density',
  VELOCITY = 'velocity'
}

export type IGrid = Array<Array<ICell>>