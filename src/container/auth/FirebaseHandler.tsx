import * as React from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {useDispatch} from '../../store'
import {verifyEmail} from '../../store/auth/actionCreator'
import {LocalStorage, setLocalStorage} from '../../function/localStorage'

export function FirebaseHandler() {
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const mode = params.get('mode')
    const obbCode: any = params.get('oobCode')

    switch (mode) {
      case 'verifyEmail': dispatch(verifyEmail(obbCode))
        return
      case 'resetPassword':
        setLocalStorage(LocalStorage.OBB_CODE, obbCode)
        history.push('/auth/change/password')
    }
  }, [location, dispatch, history])

  return null
}