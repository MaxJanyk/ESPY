import {PackageAction, PackageData} from './actionType'
import {IUserPackage} from './reducer'

export const getUserPackage: PackageAction = {type: 'package/GET_USER_PACKAGE'}

export const getFreePackage: PackageAction = {type: 'package/GET_FREE_PACKAGE'}

export const setUserPackage = (data: PackageData): PackageAction => ({type: 'package/SET_USER_PACKAGE', data})

export const setFreePackage = (data: object): PackageAction => ({type: 'package/SET_FREE_PACKAGE', data})

export const postUserPackage = (id: number): PackageAction => ({type: 'package/POST_USER_PACKAGE', id})

export const moveUserPackage = (id: number, data: IUserPackage): PackageAction => ({
  type: 'package/MOVE_USER_PACKAGE',
  id,
  data
})

