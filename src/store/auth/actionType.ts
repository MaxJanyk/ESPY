export interface SignInData {
  email: string | null
  uid: string
  phone: string | null
  avatar: string
  signInProvider: any
}

export const SET_LOADING = 'auth/SET_LOADING'
export interface SetLoading {
  type: typeof SET_LOADING
  status: boolean
}

export const SIGN_UP_EMAIL = 'auth/SIGN_UP_EMAIL'
export interface SignUpEmail {
  type: typeof SIGN_UP_EMAIL
  email: string
  password: string
}

export const VERIFY_EMAIL = 'auth/VERIFY_EMAIL'
export interface VerifyEmail {
  type: typeof VERIFY_EMAIL
  code: string
}

export const SIGN_IN_EMAIL = 'auth/SIGN_IN_EMAIL'
export interface SignInEmail {
  type: typeof SIGN_IN_EMAIL
  email: string
  password: string
  history: any
}

export const CHANGE_PASSWORD = 'auth/CHANGE_PASSWORD'
export interface ChangePassword {
  type: typeof CHANGE_PASSWORD
  obbCode: string
  password: string
}

export const GET_PHONE_CODE = 'auth/GET_PHONE_CODE'
export interface GetPhoneCode {
  type: typeof GET_PHONE_CODE
  phone: string
}

export const APPROVE_PHONE_CODE = 'auth/APPROVE_PHONE_CODE'
export interface ApprovePhoneCode extends SignInData {
  type: typeof APPROVE_PHONE_CODE
  user: any
}

export const SIGN_BY_PROVIDER = 'auth/SIGN_BY_PROVIDER'
export interface SignByProvider {
  type: typeof SIGN_BY_PROVIDER
  provider: string
  history: string
}

export const FORGOT_REQUEST = 'auth/FORGOT_REQUEST'
export interface ForgotRequest {
  type: typeof FORGOT_REQUEST
  email: string
  history: any
}

export const SIGN_BY_2FA = 'auth/SIGN_BY_2FA'
export interface SignBy2Fa {
  type: typeof SIGN_BY_2FA
  code: string
  token: string
}

export const SIGN_OUT = 'auth/SIGN_OUT'
export interface SignOut {
  type: typeof SIGN_OUT
  redirect?: string
}

export const UPDATE_AUTH_PHONE = 'auth/UPDATE_AUTH_PHONE'
export interface UpdateAuthPhone {
  type: typeof UPDATE_AUTH_PHONE
  phone: string
}

export const SET_RECAPTCHA_RENDERED_STATUS = 'auth/SET_RECAPTCHA_RENDERED_STATUS'
export interface SetRecaptchaRenderedStatus {
  type: typeof SET_RECAPTCHA_RENDERED_STATUS
  status: boolean
}

export type AuthAction =
  | SetLoading
  | SignUpEmail
  | VerifyEmail
  | SignInEmail
  | ChangePassword
  | GetPhoneCode
  | ApprovePhoneCode
  | SignByProvider
  | ForgotRequest
  | SignBy2Fa
  | SignOut
  | UpdateAuthPhone
  | SetRecaptchaRenderedStatus
