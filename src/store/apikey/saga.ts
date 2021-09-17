import {call, put, takeEvery, CallEffect, PutEffect} from 'redux-saga/effects'
import {api, Response} from '../../api/axios'
import {refreshTableData, setRequestStatus, showSnackbar} from '../common/actionCreator'
import {
  POST_APIKEY, GENERATE_KEYS, EDIT_APIKEY, DELETE_APIKEY, PostApikey, EditApikey, DeleteApikey, GenerateKey
} from './actionType'
import {setGeneratedKeys} from './actionCreator'

function* post(action: PostApikey): Generator<PutEffect | CallEffect | Promise<Response>, void, never> {
  yield put(setGeneratedKeys(null))

  try {
    const response: Response = yield call(api, {
      method: 'POST',
      url: '/api-keys',
      body: action.data
    })

    yield put(setGeneratedKeys({key: response.data.key, secret: response.data.secret}))
    yield put(refreshTableData(true))
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* generateKeys(action: GenerateKey): Generator<CallEffect | Promise<Response> | PutEffect, void, never> {
  try {
    const response: Response = yield call(api, {
      method: 'GET',
      url: `/api-keys/generate`,
      params: {
        length: action.length
      }
    })

    yield put(setGeneratedKeys(response.data))
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

function* edit(action: EditApikey): Generator {
  const {id, ...data} = action.data
  try {
    yield call(api, {
      method: 'PUT',
      url: `/api-keys/${id}`,
      body: data
    })

    yield put(refreshTableData(true))

  } catch (e) {
    yield put(showSnackbar('error', e.message))
  } finally {
    yield put(setRequestStatus(true))
  }
}

function* _delete(action: DeleteApikey): Generator {
  try {
    yield call(api, {
      method: 'DELETE',
      url: `/api-keys/${action.id}`
    })

    yield put(refreshTableData(true))

  } catch (e) {
    yield put(showSnackbar('error', e.message))
  } finally {
    yield put(setRequestStatus(true))
  }
}

export function* watchApikey() {
  yield takeEvery(POST_APIKEY, post)
  yield takeEvery(GENERATE_KEYS, generateKeys)
  yield takeEvery(EDIT_APIKEY, edit)
  yield takeEvery(DELETE_APIKEY, _delete)
}