export interface ILoc {
  x: number
  y: number
}

export interface ICell {
  density: number
}

export type IGrid = Array<Array<ICell>>