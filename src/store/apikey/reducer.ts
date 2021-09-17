import {PackageAction} from './actionType'

export type GeneratedKeys = {
  key: string
  secret: string
} | null

export type ApikeyState = {
  generatedKeys: GeneratedKeys | null
}

const initialState: ApikeyState = {
  generatedKeys: null
}

export function ApikeyReducer(state = initialState, action: PackageAction) {
  switch (action.type) {
    case 'apikey/SET_GENERATED_KEYS':
      return {
        ...state,
        generatedKeys: action.data
      }
    default:
      return state
  }
}
