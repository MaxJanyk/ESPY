import * as React from 'react'
import {Button, Dialog, DialogActions, DialogTitle} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import {useDialogStyles} from '../style/dialog'


interface IAreYouSure {
  onYes: any
  handleClose: any
}

export const DialogAreYouSure = ({onYes, handleClose}: IAreYouSure) => {
  const {t} = useTranslation()
  const classes = useDialogStyles()

  const handleYes = () => {
    onYes()
    handleClose()
  }

  return (
    <Dialog className={classes.root} open={true} onClose={handleClose}>
      <DialogTitle className="text_center">{t('common.sure')}</DialogTitle>
      <DialogActions>
        <Button
          className="button_large button_wide"
          onClick={handleClose}
          color="primary" size="large"
        >{t('common.no')}</Button>
        <Button
          className="button_large button_wide"
          onClick={handleYes}
          color="primary" variant="contained" size="large" disableElevation
        >{t('common.yes')}</Button>
      </DialogActions>
    </Dialog>
  )
}