import {AuthAction} from './actionType'
import {DEFAULT_AVATAR} from '../../index'

export const setLoading = (status: boolean): AuthAction => ({type: 'auth/SET_LOADING', status})

export const setRecaptchaRenderedStatus = (status: boolean): AuthAction => ({
  type: 'auth/SET_RECAPTCHA_RENDERED_STATUS',
  status
})

export const signUpEmail = (email: string, password: string): AuthAction => ({
  type: 'auth/SIGN_UP_EMAIL',
  email,
  password,
})

export const verifyEmail = (code: string): AuthAction => ({type: 'auth/VERIFY_EMAIL', code})

export const signInEmail = (email: string, password: string, history: any): AuthAction => ({
  type: 'auth/SIGN_IN_EMAIL',
  email,
  password,
  history
})

export const changePassword = (obbCode: string, password: string): AuthAction => ({
  type: 'auth/CHANGE_PASSWORD',
  obbCode,
  password
})

export const getPhoneCode = (phone: string): AuthAction => ({type: 'auth/GET_PHONE_CODE', phone})

export const approvePhoneCode = (data: any): AuthAction => ({
  type: 'auth/APPROVE_PHONE_CODE',
  email: data.email,
  uid: data.uid,
  phone: data.phoneNumber,
  avatar: DEFAULT_AVATAR,
  signInProvider: data.signInProvider,
  user: data
})

export const signByProvider = (provider: string, history: any): AuthAction => ({
  type: 'auth/SIGN_BY_PROVIDER',
  provider,
  history
})

export const forgotRequest = (email: string, history: any): AuthAction => ({
  type: 'auth/FORGOT_REQUEST',
  email,
  history
})

export const signBy2Fa = (code: string, token: string): AuthAction => ({type: 'auth/SIGN_BY_2FA', code, token})

export const signOut = (redirect?: string): AuthAction => ({type: 'auth/SIGN_OUT', redirect})

export const updateAuthPhone = (phone: string): AuthAction => ({
  type: 'auth/UPDATE_AUTH_PHONE',
  phone,
})