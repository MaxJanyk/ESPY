import {CommonAction} from './actionType'
import {LocalStorage} from '../../function/localStorage'
import {getLocaleJson} from '../../i18n'

type TableData = {
  list: []
  count: number
}

const localLang = localStorage.getItem(LocalStorage.LANG) || 'en'

export type CommonState = {
  language: string
  translation: object
  requestStatus: boolean
  isRtl: boolean
  snackbar: {
    isOpen:   boolean
    severity: undefined | 'error' | 'success'
    message:  undefined | string
  }
  tableData: TableData | null
  tableRefresh: boolean
}

const initialState: CommonState = {
  language: localLang,
  translation: getLocaleJson(localLang),
  requestStatus: false,
  isRtl: localStorage.getItem(LocalStorage.LANG) === 'he',
  snackbar: {
    isOpen: false,
    severity: undefined,
    message: undefined
  },
  tableData: null,
  tableRefresh: false
}

export function CommonReducer(state = initialState, action: CommonAction) {
  switch (action.type) {
    case 'common/SET_LANGUAGE':
      localStorage.setItem(LocalStorage.LANG, action.language)
      return {
        ...state,
        language: action.language,
        isRtl: action.language === 'he'
      }
    case 'common/SET_REQUEST_STATUS':
      return {
        ...state,
        requestStatus: action.status,
      }
    case 'common/SHOW_SNACKBAR':
      return {
        ...state,
        snackbar: {isOpen: true, severity: action.severity, message: action.message}
      }
    case 'common/HIDE_SNACKBAR':
      return {
        ...state,
        snackbar: {...state.snackbar, isOpen: false}
      }
    case 'common/SET_TABLE_DATA':
      return {
        ...state,
        tableData: {
          list: action.data.list,
          count: action.data.count
        }
      }
    case 'common/REFRESH_TABLE_DATA':
      return {
        ...state,
        tableRefresh: action.status
      }
    default:
      return state
  }
}
