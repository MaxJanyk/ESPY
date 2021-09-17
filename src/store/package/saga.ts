import {call, put, takeEvery} from 'redux-saga/effects'
import {api} from '../../api/axios'
import {showSnackbar} from '../common/actionCreator'
import {GET_USER_PACKAGE, GET_FREE_PACKAGE, POST_USER_PACKAGE, PostUserPackage} from './actionType'
import {setFreePackage, setUserPackage} from './actionCreator'

function* getUserPackage(): Generator {
  try {
    const {data}: any = yield call(api, {
      method: 'GET',
      url: '/user-packages'
    })

    yield put(setUserPackage({userPackage: data.yourPackages, availablePackage: data.availablePackages}))
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* getFreePackage(): Generator {
  try {
    const {data}: any = yield call(api, {
      method: 'GET',
      url: '/user-packages/package'
    })
    yield put(setFreePackage(data))
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* postUserPackage(action: PostUserPackage): Generator {
  try {
    const response: any = yield call(api, {
      method: 'POST',
      url: '/user-packages',
      params: {
        packageId: String(action.id)
      }
    })

    if (response.code === 201) {
      // yield put(moveUserPackage(action.id, response.data))
      window.location.reload()
      yield put(showSnackbar('success', response.message))
    }
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}


export function* watchPackage() {
  yield takeEvery(GET_USER_PACKAGE, getUserPackage)
  yield takeEvery(GET_FREE_PACKAGE, getFreePackage)
  yield takeEvery(POST_USER_PACKAGE, postUserPackage)
}