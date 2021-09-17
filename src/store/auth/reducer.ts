import {AuthAction} from './actionType'
import {getLocalStorage, LocalStorage} from '../../function/localStorage'
import jwtDecode from 'jwt-decode'

export enum Provider {
  GOOGLE = 'google.com',
  PHONE = 'phone',
  EMAIL = 'password',
}

export type AuthState = {
  loading: boolean
  token: string | null
  name: string | null
  provider: string | null
  recaptchaIsRendered: boolean
}

const token = getLocalStorage(LocalStorage.TOKEN)
const decodedToken: any = token ? jwtDecode(token) : null
const provider: Provider | null = decodedToken ? decodedToken.firebase.sign_in_provider : null

const initialState: AuthState = {
  loading: false,
  token: getLocalStorage(LocalStorage.TOKEN),
  name: '',
  provider: provider,
  recaptchaIsRendered: false
}

export function AuthReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case 'auth/SET_LOADING':
      return {
        ...state,
        loading: action.status
      }
    case 'auth/SET_RECAPTCHA_RENDERED_STATUS':
      return {
        ...state,
        recaptchaIsRendered: action.status
      }
    default:
      return state
  }
}
