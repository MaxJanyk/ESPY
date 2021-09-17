import {CommonAction} from './actionType'

export const setLanguage = (language: string): CommonAction => ({type: 'common/SET_LANGUAGE', language})

export const setRequestStatus = (status: boolean): CommonAction => ({type: 'common/SET_REQUEST_STATUS', status})

export const showSnackbar = (severity: string, message?: string): CommonAction => ({
  type: 'common/SHOW_SNACKBAR',
  severity,
  message
})

export const hideSnackbar: CommonAction = {type: 'common/HIDE_SNACKBAR'}

export const fetchTableData = (url: string, offset: number, limit: number): CommonAction => ({
  type: 'common/FETCH_TABLE_DATA',
  url,
  offset,
  limit
})

export const refreshTableData = (status: boolean): CommonAction => ({type: 'common/REFRESH_TABLE_DATA', status})

export const setTableData = (data: any): CommonAction => ({type: 'common/SET_TABLE_DATA', data})
