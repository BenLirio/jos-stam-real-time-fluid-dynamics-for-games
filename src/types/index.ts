export interface IVec2 {
  x: number
  y: number
}
export enum Dims {
  X = 'x',
  Y = 'y'
}

export type ILoc = IVec2


export interface ICell {
  density: number
  position: ILoc
  velocity: IVec2
}
export enum CellKeys {
  DENSITY = 'density',
  VELOCITY = 'velocity'
}

export type IGrid = Array<Array<ICell>>