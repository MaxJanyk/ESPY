import {PackageAction, EditData} from './actionType'
import {GeneratedKeys} from './reducer'

export const postApikey = (data: object): PackageAction => ({type: 'apikey/POST_APIKEY', data})

export const generateKeys = (length: number): PackageAction => ({type: 'apikey/GENERATE_KEYS', length})

export const editApikey = (data: EditData): PackageAction => ({type: 'apikey/EDIT_APIKEY', data})

export const deleteApikey = (id: number): PackageAction => ({type: 'apikey/DELETE_APIKEY', id})

export const setGeneratedKeys = (data: GeneratedKeys): PackageAction => ({type: 'apikey/SET_GENERATED_KEYS', data})
