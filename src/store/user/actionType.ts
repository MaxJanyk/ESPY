export const GET_USER = 'user/GET_USER'
export interface GetUser {
  type: typeof GET_USER
}

export const SET_USER = 'user/SET_USER'
export interface SetUser {
  type: typeof SET_USER
  data: any
}

export const UPDATE_USER = 'user/UPDATE_USER'
export interface UpdateUser {
  type: typeof UPDATE_USER
  key: string
  value: any
}

export const GENERATE_QR = 'user/GENERATE_QR'
export interface GenerateQr {
  type: typeof GENERATE_QR
}

export const TOGGLE_2STEP = 'user/TOGGLE_2STEP'
export interface Toggle2step {
  type: typeof TOGGLE_2STEP
  code: string
  is2FA: boolean
}

export const SET_QR = 'user/SET_QR'
export interface SetQr {
  type: typeof SET_QR
  qr: string | null
}

export const UPDATE_PHONE = 'user/UPDATE_PHONE'
export interface UpdatePhone {
  type: typeof UPDATE_PHONE
  phone: string
}

export const UPDATE_PASSWORD = 'user/UPDATE_PASSWORD'
export interface UpdatePassword {
  type: typeof UPDATE_PASSWORD
  password: string
}

export const DELETE_USER = 'user/DELETE_USER'
export interface DeleteUser {
  type: typeof DELETE_USER
}

export const DELETE_2FA_USER = 'user/DELETE_2FA_USER'
export interface Delete2FAUser {
  type: typeof DELETE_2FA_USER
  code: string
}

export const UPDATE_EMAIL = 'user/UPDATE_EMAIL'
export interface UpdateEmail {
  type: typeof UPDATE_EMAIL
  email: string
}

export const UPDATE_PROFILE = 'user/UPDATE_PROFILE'
export interface UpdateProfile {
  type: typeof UPDATE_PROFILE
  key: string,
  value: string
}

export type UserAction =
  | GetUser
  | SetUser
  | UpdateUser
  | Toggle2step
  | GenerateQr
  | SetQr
  | UpdatePhone
  | UpdatePassword
  | DeleteUser
  | Delete2FAUser
  | UpdateEmail
  | UpdateProfile


