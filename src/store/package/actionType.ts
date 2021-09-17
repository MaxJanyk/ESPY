import {IUserPackage} from './reducer'

export type PackageData = {
  userPackage: []
  availablePackage: []
}

export const GET_USER_PACKAGE = 'package/GET_USER_PACKAGE'
export interface GetUserPackage {
  type: typeof GET_USER_PACKAGE
}

export const GET_FREE_PACKAGE = 'package/GET_FREE_PACKAGE'
export interface GetFreePackage {
  type: typeof GET_FREE_PACKAGE
}

export const SET_USER_PACKAGE = 'package/SET_USER_PACKAGE'
export interface SetUserPackage {
  type: typeof SET_USER_PACKAGE
  data: PackageData
}

export const SET_FREE_PACKAGE = 'package/SET_FREE_PACKAGE'
export interface SetFreePackage {
  type: typeof SET_FREE_PACKAGE
  data: object
}

export const POST_USER_PACKAGE = 'package/POST_USER_PACKAGE'
export interface PostUserPackage {
  type: typeof POST_USER_PACKAGE
  id: number
}

export const MOVE_USER_PACKAGE = 'package/MOVE_USER_PACKAGE'
export interface MoveUserPackage {
  type: typeof MOVE_USER_PACKAGE
  id: number
  data: IUserPackage
}

export type PackageAction =
  | GetUserPackage
  | GetFreePackage
  | SetUserPackage
  | SetFreePackage
  | PostUserPackage
  | MoveUserPackage
