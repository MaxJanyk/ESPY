import {UserAction} from './actionType'

export interface IUser {
  avatar: string
  email: string
  firstname: string
  lastname: string
  phone: string
  password: string
  is2FAEnabled: null | boolean
  twoFactorQr: string | null
}

export interface UserState extends IUser {
  isUserFetched: boolean
}

const initialState: UserState = {
  isUserFetched: false,
  avatar: '',
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  phone: '',
  is2FAEnabled: null,
  twoFactorQr: null
}

export function UserReducer(state = initialState, action: UserAction) {
  switch (action.type) {
    case 'user/SET_USER':
      return {
        ...state,
        isUserFetched: true,
        avatar: action.data.avatar || '',
        email: action.data.email || '',
        firstname: action.data.firstname || '',
        lastname: action.data.lastname || '',
        phone: action.data.phone || '',
        is2FAEnabled: action.data.is2FAEnabled
      }
    case 'user/UPDATE_USER':
      return {
        ...state,
        [action.key]: action.value
      }
    case 'user/SET_QR':
      return {
        ...state,
        twoFactorQr: action.qr
      }
    default:
      return state
  }
}
