import {PackageAction} from './actionType'

export interface IUserPackage {
  id: number
  packageId: number
  endDate: string
  isRenew: boolean
  package: {
    name: string
    isActive: boolean
    description: string[]
    color?: string
  }
}

export interface IAvailablePackage {
  id: number
  color: string
  name: string
  price: number
  description: []
}

export type PackageState = {
  freePackage: [] | null
  availablePackage: IAvailablePackage[] | null
  userPackage: IUserPackage[] | null
}

const initialState: PackageState = {
  freePackage: null,
  availablePackage: null,
  userPackage: null,
}

export function PackageReducer(state = initialState, action: PackageAction) {
  switch (action.type) {
    case 'package/SET_USER_PACKAGE':
      return {
        ...state,
        userPackage: action.data.userPackage,
        availablePackage: action.data.availablePackage
      }
    case 'package/MOVE_USER_PACKAGE':
      if (state.availablePackage && state.userPackage) {
        const movingPackageIdx = state.availablePackage.findIndex(el => el.id === action.id)

        const newAvailablePackage: IAvailablePackage[] = [
          ...state.availablePackage.slice(0, movingPackageIdx),
          ...state.availablePackage.slice(movingPackageIdx + 1)
        ]

        const newUserPackage = [...state.userPackage, action.data]

        return {
          ...state,
          availablePackage: newAvailablePackage,
          userPackage: newUserPackage,
        }
      }
      else {
        return state
      }
    case 'package/SET_FREE_PACKAGE':
      return {
        ...state,
        freePackage: action.data
      }
    default:
      return state
  }
}
