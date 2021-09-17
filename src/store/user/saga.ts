import {call, put, takeEvery, CallEffect, PutEffect} from 'redux-saga/effects'
import {
  GET_USER, TOGGLE_2STEP, GENERATE_QR, UPDATE_PHONE, UPDATE_PASSWORD, DELETE_USER, UPDATE_EMAIL, UPDATE_PROFILE,
  DELETE_2FA_USER, Toggle2step, UpdatePhone, UpdatePassword, UpdateEmail, UpdateProfile, Delete2FAUser
} from './actionType'
import {api, Response} from '../../api/axios'
import {setRequestStatus, showSnackbar} from '../common/actionCreator'
import {setQr, setUser, updateUser} from './actionCreator'
import {firebase} from '../../index'
import {setLoading, signOut} from '../auth/actionCreator'
import * as service from '../auth/service'

function throwError(err: string) {
  throw new Error(err)
}

function* getUser(): Generator<CallEffect | Promise<Response> | PutEffect, void, never> {
  try {
    const response: Response = yield call(api, {
      method: 'GET',
      url: '/users/profile'
    })

    yield put(setUser(response.data))
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* generateQr(): Generator<CallEffect | Promise<Response> | PutEffect, void, never> {
  try {
    let response: Response = yield call(api, {
      method: 'POST',
      url: '/auth/generate',
      responseType: 'blob'
    })

    const imgSrc = URL.createObjectURL(response.data)

    yield put(setQr(imgSrc))

  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* toggle2step(action: Toggle2step): Generator {
  const isTurnedOn = action.is2FA

  try {
    yield call(api, {
      method: 'POST',
      url: '/auth/set2FA',
      body: {
        twoFACode: action.code,
        is2FA: isTurnedOn
      }
    })

    if (isTurnedOn) yield put(signOut())
    else yield put(updateUser('is2FAEnabled', action.is2FA))

    yield put(showSnackbar('success'))
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* updatePhone(action: UpdatePhone): Generator<CallEffect | Promise<Response> | PutEffect, void, never> {
  const phone = `+${action.phone}`

  yield put(setLoading(true))

  try {
    const response: Response = yield call(api, {
      method: 'PUT',
      url: '/users/phone',
      body: {
        phone: phone
      }
    })

    if (response.code === 200) {
      yield put(updateUser('phone', phone))
      yield put(showSnackbar('success', response.data.message))
    }
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  } finally {
    yield put(setLoading(false))
    yield put(setRequestStatus(true))
  }
}

function* updatePassword(action: UpdatePassword): Generator {
  const auth = firebase.auth()
  const currentUser = auth.currentUser

  yield put(setLoading(true))
  yield put(setRequestStatus(false))

  try {
    if (currentUser) {
      yield call([currentUser, currentUser.updatePassword], action.password)
      yield put(updateUser('password', action.password))
      yield put(showSnackbar('success'))
    }
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  } finally {
    yield put(setRequestStatus(true))
  }
}

function* deleteUser(): Generator {
  const user = firebase.auth().currentUser
  try {
    if (user === null) {
      throwError('User is not exist in firebase object')
      return null
    }

    yield call([user, user.delete])

    yield call(api, {
      method: 'PUT',
      url: '/users/profile/delete'
    })

    yield call(signOut)
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* delete2FAUser(action: Delete2FAUser): Generator {
  const user = firebase.auth().currentUser

  yield put(setLoading(true))

  try {
    if (user === null) {
      throwError('User is not exist in firebase object')
      return null
    }

    yield call(api, {
      method: 'POST',
      url: '/auth/authenticate',
      body: {
        twoFACode: action.code
      }
    })

    yield call([user, user.delete])

    yield call(api, {
      method: 'PUT',
      url: '/users/profile/delete'
    })

    yield call(service.signOut)
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* updateEmail(action: UpdateEmail): Generator {
  const auth = firebase.auth()
  const currentUser = auth.currentUser

  yield put(setLoading(true))

  try {
    if (currentUser) {
      yield call([currentUser, currentUser.updateEmail], action.email)
      currentUser.sendEmailVerification()
      const response: any = yield call(api, {
        method: 'PUT',
        url: '/users/email',
        body: {
          email: action.email
        }
      })
      yield put(updateUser('email', action.email))
      yield put(showSnackbar('success', response.data.message))
    }
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  } finally {
    yield put(setLoading(false))
  }
}

function* updateProfile(action: UpdateProfile): Generator {
  try {
    yield call(api, {
      method: 'PUT',
      url: '/users/profile',
      body: {
        [action.key]: action.value
      }
    })
    yield put(updateUser(action.key, action.value))

  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

export function* watchUser() {
  yield takeEvery(GET_USER, getUser)
  yield takeEvery(TOGGLE_2STEP, toggle2step)
  yield takeEvery(GENERATE_QR, generateQr)
  yield takeEvery(UPDATE_PHONE, updatePhone)
  yield takeEvery(UPDATE_PASSWORD, updatePassword)
  yield takeEvery(UPDATE_EMAIL, updateEmail)
  yield takeEvery(UPDATE_PROFILE, updateProfile)
  yield takeEvery(DELETE_USER, deleteUser)
  yield takeEvery(DELETE_2FA_USER, delete2FAUser)
}
