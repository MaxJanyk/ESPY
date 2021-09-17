import axios from 'axios'
import {getLocalStorage, LocalStorage} from '../function/localStorage'
import {store} from '../store'
import {signOut} from '../store/auth/actionCreator'

export type ApiProps = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  token?: string
  body?: any
  params?: any
  responseType?: any
}

export type Response = {
  data: any
  code: number
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API
})

export const api = function ({method, url, body, params, token, responseType}: ApiProps): Promise<Response> {
  if (token) localStorage.removeItem(LocalStorage.TOKEN)
  token = token || getLocalStorage(LocalStorage.TOKEN)

  const config = {
    method: method,
    url: url,
    data: body,
    responseType: responseType,
    params: params
  } as any

  const headers = {
    Authorization: `Bearer ${token}`
  }

  if (token) config.headers = headers

  return instance.request(config)
    .then(response => {
      return {
        code: response.status,
        data: response.data
      }
    })
    .catch(error => {
      if (error.response.status === 401) store.dispatch(signOut())

      console.error('Request Failed:', error.config)

      if (error.response) console.error('Data:', error.response.data)
      else console.error('Error Message:', error.message)

      return Promise.reject(error.response.data || error)
    })
}
