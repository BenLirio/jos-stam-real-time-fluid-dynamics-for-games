export interface IVec2 {
  x: number
  y: number
}

export type ILoc = IVec2


export interface ICell {
  density: number
  velocity: IVec2
}

export type IGrid = Array<Array<ICell>>