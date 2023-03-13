import { IVec2 } from '../types'

export const add = (a: number, b: number) => a + b

export const dist2 = (a: IVec2, b: IVec2) => (a.x - b.x)**2 + (a.y - b.y)**2
