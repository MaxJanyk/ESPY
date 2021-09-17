import {GeneratedKeys} from './reducer'

export const POST_APIKEY = 'apikey/POST_APIKEY'
export interface PostApikey {
  type: typeof POST_APIKEY
  data: object
}

export const GENERATE_KEYS = 'apikey/GENERATE_KEYS'
export interface GenerateKey {
  type: typeof GENERATE_KEYS
  length: number
}

export const SET_GENERATED_KEYS = 'apikey/SET_GENERATED_KEYS'
export interface SetGeneratedKeys {
  type: typeof SET_GENERATED_KEYS
  data: GeneratedKeys
}

export type EditData = {
  id: number
  length: number
  key: string
  secret: string
}

export const EDIT_APIKEY = 'apikey/EDIT_APIKEY'
export interface EditApikey {
  type: typeof EDIT_APIKEY
  data: EditData
}

export const DELETE_APIKEY = 'apikey/DELETE_APIKEY'
export interface DeleteApikey {
  type: typeof DELETE_APIKEY
  id: number
}

export type PackageAction =
  | PostApikey
  | GenerateKey
  | SetGeneratedKeys
  | EditApikey
  | DeleteApikey
