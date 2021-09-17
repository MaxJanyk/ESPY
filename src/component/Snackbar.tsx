import React from 'react'
import {useDispatch, useSelector} from '../store'
import {hideSnackbar} from '../store/common/actionCreator'
import {Snackbar as MuiSnackbar} from '@material-ui/core'
import {Check as CheckIcon, ErrorOutline as ErrorIcon} from '@material-ui/icons'
import MuiAlert from '@material-ui/lab/Alert'
import {useAlertStyles} from '../style/main'

export default function Snackbar() {
  const data = useSelector(state => state.common.snackbar)
  const dispatch = useDispatch()
  const alertClasses = useAlertStyles()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    dispatch(hideSnackbar)
  }

  const isSuccess = data.severity === 'success'
  const icon = isSuccess ? <CheckIcon/> : <ErrorIcon/>
  const severityColor = isSuccess ? '#1F8B24' : '#DA100B'

  return (
    <MuiSnackbar open={data.isOpen} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        severity={data.severity}
        color={data.severity}
        className={`${alertClasses.root} ${alertClasses.standardSuccess}`}
        icon={icon}
        elevation={6}
        variant="standard"
        onClose={handleClose}
      >
        <span className={alertClasses.severity} style={{color: severityColor}}>{data.severity}! </span>
        {data.message}
      </MuiAlert>
    </MuiSnackbar>
  )
}
