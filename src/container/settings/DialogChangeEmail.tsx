import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import {useTranslation} from 'react-i18next'
import {Box, DialogContent, FormControl, Grid} from '@material-ui/core'
import {useDialogStyles} from '../../style/dialog'
import Joi from 'joi'
import {useDispatch} from '../../store'
import {hideSnackbar, setRequestStatus, showSnackbar} from '../../store/common/actionCreator'
import {updateEmail} from '../../store/user/actionCreator'

type Props = {
  handleClose: () => void
}

type InputEvent = React.ChangeEvent<HTMLInputElement>

export const DialogChangeEmail = ({handleClose}: Props) => {
  const {t} = useTranslation()
  const classes = useDialogStyles()
  const dispatch = useDispatch()

  const [input, setInput] = React.useState({
    email: '',
  })

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const inputRef = React.useRef<HTMLInputElement>(null)

  const emailValidation = Joi.string().required().min(6).max(320).regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .messages({
      'string.min': `"${t('input.label.email')}": ${t('validation.min6')}`,
      'string.max': `"${t('input.label.email')}": ${t('validation.max320')}`,
      'string.pattern.base': `"${t('input.label.email')}": ${t('validation.email')}`
    })

  const schema = Joi.object({
    email: emailValidation
  })

  const handleInput = (id: string, value: string) => {
    setInput(state => ({
      ...state,
      [id]: value
    }))
  }

  const handleOnClose = React.useCallback(() => {
    handleClose()
    dispatch(setRequestStatus(false))
  }, [dispatch, handleClose])

  const submit = (e: any) => {
    const {error} = schema.validate(input, {abortEarly: true})

    if (error?.details) dispatch(showSnackbar('error', error.details[0].message))
    else {
      dispatch(hideSnackbar)
      dispatch(updateEmail(input.email))
    }
    handleOnClose()
  }

  return (
    <Dialog
      className={`${classes.root} ${classes.wide}`}
      open={true}
      onClose={handleOnClose}
      onEntered={() => inputRef.current?.focus()}
    >

      <DialogTitle>{t('settings.changeEmail')}</DialogTitle>
      <DialogContent>
        <Box my={2}>
          <Grid container>
            <Grid className="form__label" item xs={5}>{t('input.label.newEmail')}</Grid>
            <Grid item xs={7}>
              <FormControl className="form__control" variant="outlined">
                <input
                  type="text"
                  value={input.email}
                  ref={inputRef}
                  placeholder={t('input.hint.newEmail')}
                  onChange={(e: InputEvent) => handleInput('email', e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <DialogActions>
          <Button
            className="button_large button_wide"
            onClick={handleOnClose}
            color="primary" size="large"
          >{t('common.close')}</Button>
          <Button
            className="button_large button_wide"
            onClick={submit}
            color="primary" variant="contained" size="large" disableElevation
          >{t('common.save')}</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}