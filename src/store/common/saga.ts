import {call, put, takeEvery} from 'redux-saga/effects'
import {api} from '../../api/axios'
import {setTableData, showSnackbar} from './actionCreator'
import {FETCH_TABLE_DATA, FetchTableData} from './actionType'

function* fetchTableData(action: FetchTableData): Generator {
  try {
    const response: any = yield call(api, {
      method: 'GET',
      url: action.url,
      params: {
        offset: action.offset,
        limit: action.limit
      }
    })

    yield put(setTableData(response.data))
  } catch (e) {
    yield put(showSnackbar('error', e.message))
  }
}

export function* watchCommon() {
  yield takeEvery(FETCH_TABLE_DATA, fetchTableData)
}