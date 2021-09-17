import {combineReducers, createStore, applyMiddleware} from 'redux'
import {useDispatch as _useDispatch, useSelector as _useSelector, TypedUseSelectorHook} from 'react-redux'
import {AuthState, AuthReducer} from './auth/reducer'
import {CommonState, CommonReducer} from './common/reducer'
import {UserState, UserReducer} from './user/reducer'
import {PackageState, PackageReducer} from './package/reducer'
import {ApikeyState, ApikeyReducer} from './apikey/reducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects'
import {watchAuth} from './auth/saga'
import {watchCommon} from './common/saga'
import {watchUser} from './user/saga'
import {watchPackage} from './package/saga'
import {watchApikey} from './apikey/saga'

// type Actions = AuthAction | ...

type Dispatch = typeof store.dispatch

export type State = {
  auth: AuthState
  common: CommonState
  user: UserState
  package: PackageState
  apikey: ApikeyState
}

const reducer = combineReducers({
  auth: AuthReducer,
  common: CommonReducer,
  user: UserReducer,
  package: PackageReducer,
  apikey: ApikeyReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

export const useSelector: TypedUseSelectorHook<State> = _useSelector

export const useDispatch = () => _useDispatch<Dispatch>()

function* rootSaga() {
  yield all([
    watchAuth(),
    watchCommon(),
    watchUser(),
    watchPackage(),
    watchApikey(),
  ])
}

sagaMiddleware.run(rootSaga)
