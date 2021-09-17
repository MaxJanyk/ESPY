import firebaseApp from 'firebase/app'
import 'firebase/auth'
import {call, put, takeEvery, select, CallEffect, PutEffect, SelectEffect} from 'redux-saga/effects'
import {
  SIGN_UP_EMAIL, SIGN_IN_EMAIL, GET_PHONE_CODE, APPROVE_PHONE_CODE, SIGN_BY_PROVIDER, FORGOT_REQUEST, SIGN_BY_2FA,
  SIGN_OUT, UPDATE_AUTH_PHONE, VERIFY_EMAIL, CHANGE_PASSWORD, ApprovePhoneCode, ForgotRequest, GetPhoneCode,
  SignByProvider, SignInEmail, SignUpEmail, SignBy2Fa, SignOut, UpdateAuthPhone, VerifyEmail, ChangePassword
} from './actionType'
import {setLoading, setRecaptchaRenderedStatus} from './actionCreator'
import {setRequestStatus, showSnackbar} from '../common/actionCreator'
import {getProvider, getToken, signOut} from './service'
import {history} from '../../App'
import {api, Response} from '../../api/axios'
import {LocalStorage, setLocalStorage} from '../../function/localStorage'
import {State} from '../index'
import {firebase} from '../../index'
import {Provider} from './reducer'
import {updateUser} from '../user/actionCreator'

function* signUpEmail(action: SignUpEmail): Generator<Promise<Response> | CallEffect | PutEffect, void, never> {
  const auth = firebaseApp.auth()

  try {
    const response: Response = yield call(api, {
      method: 'POST',
      url: '/users',
      body: {
        email: action.email,
        password: action.password
      }
    })

    if (response.code === 201) {
      const {user}: any = yield call([auth, auth.signInWithEmailAndPassword], action.email, action.password)
      user.sendEmailVerification()
        .then(() => history.push('/auth/register/email'))
    }
  } catch (error) {
    yield put(showSnackbar('error', error.message))
  } finally {
    yield put(setLoading(false))
  }
}

function* verifyEmail(action: VerifyEmail): Generator<CallEffect | PutEffect, void, never> {
  const auth = firebaseApp.auth()

  try {
    yield call([auth, auth.applyActionCode], action.code)
    yield put(showSnackbar('success'))
  } catch (error) {
    yield put(showSnackbar('error', error.message))
  } finally {
    history.push('/auth')
  }
}

function* signInEmail(action: SignInEmail): Generator<Promise<Response> | CallEffect | PutEffect, void, never> {
  const auth = firebaseApp.auth()

  try {
    const {user}: any = yield call([auth, auth.signInWithEmailAndPassword], action.email, action.password)

    const token: string = yield call(getToken, user)

    const response: Response = yield call(api, {
      method: 'GET',
      url: '/auth/get2FA',
      token
    })

    if (response.data.result) {
      action.history.push({
        pathname: '/auth/2step',
        state: token
      })
      return
    }
    else {
      yield call(api, {
        method: 'POST',
        url: '/users/session',
        body: {uid: user.uid},
        token
      })

      setLocalStorage(LocalStorage.TOKEN, token)
      window.location.replace('/')
    }
  } catch (error) {
    yield put(showSnackbar('error', error.message))
  } finally {
    yield put(setLoading(false))
  }
}

function* changePassword(action: ChangePassword): Generator {
  const auth = firebaseApp.auth()

  try {
    yield call([auth, auth.verifyPasswordResetCode], action.obbCode)
    yield call([auth, auth.confirmPasswordReset], action.obbCode, action.password)

    yield put(showSnackbar('success'))
    localStorage.removeItem(LocalStorage.OBB_CODE)
    history.push('/auth')
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* getPhoneCode(action: GetPhoneCode): Generator<SelectEffect | PutEffect | CallEffect, void, never> {
  const auth = firebaseApp.auth()
  const recaptchaIsRendered: boolean = yield select(state => state.auth.recaptchaIsRendered)
  const phoneNumber = '+' + action.phone

  yield put(setLoading(true))

  try {
    if (!recaptchaIsRendered) {
      window.recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {size: 'invisible'})
      yield put(setRecaptchaRenderedStatus(true))
    }

    window.confirmationResult = yield call([auth, auth.signInWithPhoneNumber], phoneNumber, window.recaptcha)

    setLocalStorage(LocalStorage.APPROVE_PHONE_CODE_STATE, {phone: action.phone})

    history.push('/auth/register/phone')
  } catch (error) {
    yield put(showSnackbar('error', error.message))
  } finally {
    yield put(setLoading(false))
  }
}

function* approvePhoneCode(action: ApprovePhoneCode): Generator {
  yield put(setLoading(true))

  try {
    const {user, type, ...data} = action

    yield call(api, {
      method: 'POST',
      url: '/auth/signup-provider',
      body: {
        ...data,
        signInProvider: Provider.PHONE
      }
    })

    const token = yield call(getToken, user)

    setLocalStorage(LocalStorage.TOKEN, token)
    localStorage.removeItem((LocalStorage.APPROVE_PHONE_CODE_STATE))
    window.location.replace('/')
  } catch (error) {
    yield put(showSnackbar('error', error.message))
  } finally {
    yield put(setLoading(false))
  }
}

function* forgotRequest(action: ForgotRequest): Generator {
  const auth = firebaseApp.auth()

  yield put(setLoading(true))

  try {
    yield call([auth, auth.sendPasswordResetEmail], action.email)

    action.history.push({
      pathname: '/auth/forgot/done',
      state: {email: action.email}
    })
  } catch (error) {
    yield put(showSnackbar('error', error.message))
  } finally {
    yield put(setLoading(false))
  }
}

function* signByProvider(action: SignByProvider): Generator<PutEffect | CallEffect | Promise<Response>, void, never> {
  const auth = firebaseApp.auth()
  const provider = getProvider(action.provider)

  yield put(setLoading(true))

  try {
    const {user}: any = yield call([auth, auth.signInWithPopup], provider)

    const [firstname, lastname] = user.displayName?.split(' ')

    yield call(api, {
      method: 'POST',
      url: '/auth/signup-provider',
      body: {
        email: user.email,
        uid: user.uid,
        phone: user.phoneNumber,
        avatar: user.photoURL,
        signInProvider: user.providerData[0].providerId,
        firstname,
        lastname
      }
    })

    const token: any = yield call(getToken, user)

    const response: Response = yield call(api, {
      method: 'GET',
      url: '/auth/get2FA',
      token
    })

    if (response.data.result) {
      history.push({
        pathname: '/auth/2step',
        state: token
      })
    }
    else {
      setLocalStorage(LocalStorage.TOKEN, token)
      window.location.replace('/')
    }
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  } finally {
    yield put(setLoading(false))
  }
}

function* signBy2Fa(action: SignBy2Fa): Generator<PutEffect | CallEffect | Promise<Response>, void, never> {
  const auth = firebaseApp.auth()

  yield put(setLoading(true))

  try {
    const response: Response = yield call(api, {
      method: 'POST',
      url: '/auth/authenticate',
      body: {
        twoFACode: action.code
      },
      token: action.token
    })

    const {user}: any = yield call([auth, auth.signInWithCustomToken], response.data.token)

    const newToken = yield call(getToken, user)
    setLocalStorage(LocalStorage.TOKEN, newToken)

    window.location.replace('/')
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  } finally {
    yield put(setLoading(false))
  }
}

function* signOutWorker(action: SignOut) {
  const auth = firebaseApp.auth()

  try {
    const is2FAEnabled: boolean = yield select((state: State) => state.user.is2FAEnabled)

    if (is2FAEnabled) {
      yield call(api, {
        method: 'PUT',
        url: '/auth/logout2FA'
      })
    }

    yield call([auth, auth.signOut])

    yield call(signOut, action.redirect)
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* updateAuthPhone(action: UpdateAuthPhone): Generator<
  SelectEffect | PutEffect | CallEffect | Promise<Response>,
  void,
  never
  > {
  const auth: any = firebaseApp.auth()
  const phoneProvider = new firebase.auth.PhoneAuthProvider()
  const recaptchaIsRendered: any = yield select(state => state.auth.recaptchaIsRendered)
  const phone = `+${action.phone}`

  yield put(setLoading(true))

  try {
    if (!recaptchaIsRendered) {
      window.recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {size: 'invisible'})
      yield put(setRecaptchaRenderedStatus(true))
    }

    const verificationId: any = yield call([phoneProvider, phoneProvider.verifyPhoneNumber], phone, window.recaptcha)

    const verificationCode: any = prompt('Please enter the verification code that was sent to your mobile device')

    const phoneCredential: any = yield call([firebase.auth.PhoneAuthProvider, firebase.auth.PhoneAuthProvider.credential], verificationId, verificationCode)

    yield call([auth.currentUser, auth.currentUser.updatePhoneNumber], phoneCredential)

    const response: Response = yield call(api, {
      method: 'PUT',
      url: '/users/phone',
      body: {
        phone: phone
      }
    })

    yield put(updateUser('phone', phone))

    yield put(showSnackbar('success', response.data.message))

  } catch (e) {
    yield put(showSnackbar('error', e.message))
  } finally {
    yield put(setLoading(false))
    yield put(setRequestStatus(true))
    yield put(setRecaptchaRenderedStatus(false))
  }
}

export function* watchAuth() {
  yield takeEvery(SIGN_UP_EMAIL, signUpEmail)
  yield takeEvery(VERIFY_EMAIL, verifyEmail)
  yield takeEvery(SIGN_IN_EMAIL, signInEmail)
  yield takeEvery(CHANGE_PASSWORD, changePassword)
  yield takeEvery(GET_PHONE_CODE, getPhoneCode)
  yield takeEvery(APPROVE_PHONE_CODE, approvePhoneCode)
  yield takeEvery(SIGN_BY_PROVIDER, signByProvider)
  yield takeEvery(FORGOT_REQUEST, forgotRequest)
  yield takeEvery(SIGN_BY_2FA, signBy2Fa)
  yield takeEvery(SIGN_OUT, signOutWorker)
  yield takeEvery(UPDATE_AUTH_PHONE, updateAuthPhone)
}