import {UserAction} from './actionType'
import {IUser} from './reducer'

export const getUser: UserAction = {type: 'user/GET_USER'}

export const setUser = (data: IUser): UserAction => ({type: 'user/SET_USER', data})

export const updateUser = (key: string, value: any): UserAction => ({type: 'user/UPDATE_USER', key, value})

export const generateQr: UserAction = {type: 'user/GENERATE_QR'}

export const setQr = (qr: string | null): UserAction => ({type: 'user/SET_QR', qr})

export const toggle2step = (code: string, is2FA: boolean): UserAction => ({type: 'user/TOGGLE_2STEP', code, is2FA})

export const updatePhone = (phone: string): UserAction => ({type: 'user/UPDATE_PHONE', phone})

export const updatePassword = (password: string): UserAction => ({type: 'user/UPDATE_PASSWORD', password})

export const deleteUser: UserAction = {type: 'user/DELETE_USER'}

export const delete2FAUser = (code: string): UserAction => ({type: 'user/DELETE_2FA_USER', code})

export const updateEmail = (email: string): UserAction => ({type: 'user/UPDATE_EMAIL', email})

export const updateProfile = (key: string, value: string): UserAction => ({type: 'user/UPDATE_PROFILE', key, value})
