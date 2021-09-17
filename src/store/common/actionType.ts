export const SET_LANGUAGE = 'common/SET_LANGUAGE'
export interface SetLanguage {
  type: typeof SET_LANGUAGE
  language: string
}

export const SHOW_SNACKBAR = 'common/SHOW_SNACKBAR'
export interface ShowSnackbar {
  type: typeof SHOW_SNACKBAR
  severity: string
  message?: string
}

export const HIDE_SNACKBAR = 'common/HIDE_SNACKBAR'
export interface HideSnackbar {
  type: typeof HIDE_SNACKBAR
}

export const FETCH_TABLE_DATA = 'common/FETCH_TABLE_DATA'
export interface FetchTableData {
  type: typeof FETCH_TABLE_DATA
  url: string
  offset: number
  limit: number
}

export const REFRESH_TABLE_DATA = 'common/REFRESH_TABLE_DATA'
export interface RefreshTableData {
  type: typeof REFRESH_TABLE_DATA
  status: boolean
}

export const SET_TABLE_DATA = 'common/SET_TABLE_DATA'
export interface SetTableData {
  type: typeof SET_TABLE_DATA
  data: any
}

export const SET_REQUEST_STATUS = 'common/SET_REQUEST_STATUS'
export interface SetRequestStatus {
  type: typeof SET_REQUEST_STATUS
  status: boolean
}

export type CommonAction =
  | SetLanguage
  | ShowSnackbar
  | HideSnackbar
  | FetchTableData
  | RefreshTableData
  | SetTableData
  | SetRequestStatus
