import * as React from 'react'
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import {generateQr, setQr} from '../../store/user/actionCreator'
import {useDispatch} from '../../store'
import {useDialogStyles} from '../../style/dialog'

type Props = {
  qrCode: string | null
  handleClose: any
  is2FAEnabled: boolean
  handle2FAInputOpen: () => void
}

export const Dialog2FAQr = ({qrCode, handleClose, handle2FAInputOpen}: Props) => {
  const {t} = useTranslation()
  const classes = useDialogStyles()
  const dispatch = useDispatch()

  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    dispatch(generateQr)

    if (inputRef.current) inputRef.current.focus()

    return () => {
      dispatch(setQr(null))
    }
  }, [dispatch])

  const handleQrCodeScanned = () => {
    handleClose()
    handle2FAInputOpen()
    dispatch(setQr(null))
  }

  return (
    <Dialog className={`${classes.root} ${classes.wide}`} open={true} onClose={handleClose}>
      <DialogTitle>{t('auth.2step.title')}</DialogTitle>
      <DialogContent>
        <>
          <p>{t('settings.2factorHint')}</p>
          <p>{t('settings.2factorHint2')}</p>
          <Grid container direction="column" alignItems="center">
            <Grid item><h2>{t('settings.2factorScan')}</h2></Grid>
            <Grid item>
              {qrCode ? <img src={qrCode} width={200} height={200} alt="Your QR code"/> : <CircularProgress/>}
            </Grid>
          </Grid>
        </>
      </DialogContent>
      <DialogActions>
        <Button
          className="button_large button_wide"
          onClick={handleClose}
          color="primary" size="large"
        >{t('common.cancel')}</Button>
        <Button
          className="button_large button_wide"
          onClick={handleQrCodeScanned}
          color="primary" variant="contained" size="large" disableElevation
        >Done</Button>
      </DialogActions>
    </Dialog>
  )
}