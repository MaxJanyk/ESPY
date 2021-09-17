import {AES, enc} from 'crypto-js'

export enum LocalStorage {
  TOKEN = 'TOKEN',
  LANG = 'LANG',
  APPROVE_PHONE_CODE_STATE = 'APPROVE_PHONE_CODE_STATE',
  NAVBAR_STATUS = 'NAVBAR_STATUS',
  OBB_CODE = 'OBB_CODE'
}

const secret: any = process.env.REACT_APP_STORAGE_SECRET

export const setLocalStorage = (key: string, value: any) => {
  const stringed = JSON.stringify(value)
  const encrypted = AES.encrypt(stringed, secret).toString()
  localStorage.setItem(key, encrypted)
}

export const getLocalStorage = (key: any) => {
  const encrypted: any = localStorage.getItem(key)

  if (encrypted) {
    const decrypted = AES.decrypt(encrypted, secret)
    return JSON.parse(decrypted.toString(enc.Utf8))
  }
}