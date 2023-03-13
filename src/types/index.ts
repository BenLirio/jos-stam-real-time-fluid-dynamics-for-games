export interface IVec2 {
  x: number
  y: number
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
  pressure: number
}

export type IGrid = Array<Array<ICell>>

export interface IMouse {
  position: ILoc
  velocity: IVec2
}