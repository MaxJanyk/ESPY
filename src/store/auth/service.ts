import firebase from 'firebase/app'
import {LocalStorage} from '../../function/localStorage'

export const getProvider = (name: string) => {
  switch (name) {
    case 'google':
      return new firebase.auth.GoogleAuthProvider()
    case 'facebook':
      return new firebase.auth.FacebookAuthProvider()
    case 'microsoft.com':
    default:
      const provider = new firebase.auth.OAuthProvider(name)
      // return provider.setCustomParameters({
        // prompt: 'consent',
        // tenant: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
      // })
      return provider
  }
}

export const getToken = (user: any): Promise<string> => {
  return new Promise(async resolve => {
    const idToken = await user.getIdToken(true)
    resolve(idToken)
  })
}

export const signOut = (redirect?: string) => {
  const url = redirect ? redirect : '/auth'

  localStorage.removeItem(LocalStorage.TOKEN)
  window.location.replace(url)
}