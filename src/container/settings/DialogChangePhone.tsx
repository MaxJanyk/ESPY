import * as React from 'react'
import {useTranslation} from 'react-i18next'
import NumberFormat from 'react-number-format'
import Joi from 'joi'
import {useDispatch, useSelector} from '../../store'
import {setRequestStatus} from '../../store/common/actionCreator'
import {updateAuthPhone} from '../../store/auth/actionCreator'
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@material-ui/core'
import {useDialogStyles} from '../../style/dialog'
import {Provider} from '../../store/auth/reducer'
import {updatePhone} from '../../store/user/actionCreator'
import {ErrorOutline as ErrorIcon} from '@material-ui/icons'

type Props = {
  input: string
  handleClose: () => void
}

interface IInitState {
  value: string
  error: string | null
}

export const DialogChangePhone = ({input: initInput, handleClose}: Props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const classes = useDialogStyles()

  const provider = useSelector(state => state.auth.provider)
  const requestStatus = useSelector(state => state.common.requestStatus)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [input, setInput] = React.useState<IInitState>({
    value: initInput.replaceAll(/\+/g, ''),
    error: null
  })

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const handleOnClose = React.useCallback(() => {
    handleClose()
    dispatch(setRequestStatus(false))
  }, [dispatch, handleClose])

  React.useEffect(() => {
    if (requestStatus) handleOnClose()
  }, [handleOnClose, requestStatus])

  const phoneValidation = Joi
    .string().required().regex(/^[0-9]{12,15}$/)
    .messages({
      'string.empty': t('validation.required'),
      'string.pattern.base': t('validation.phone')
    })

  const schema = Joi.object({
    phone: phoneValidation,
  })

  const handleInput = (value: string) => {
    value = value.replaceAll(/ /g, '')

    setInput(state => ({
      ...state,
      value: value
    }))
  }

  const submit = () => {
    const data = {
      phone: input.value
    }

    const {error} = schema.validate(data, {abortEarly: true})

    if (error?.details) {
      const message = error.details[0].message

      setInput((state: any) => ({
        ...state,
        error: message
      }))
    }
    else {
      setInput((state: any) => ({
        ...state,
        error: null
      }))

      if (provider === Provider.PHONE) dispatch(updateAuthPhone(input.value))
      else dispatch(updatePhone(input.value))
    }
  }

  return (
    <Dialog
      className={`${classes.root} ${classes.wide}`}
      open={true}
      onClose={handleOnClose}
      onEntered={() => inputRef.current?.focus()}
    >
      <DialogTitle>{t('settings.changePhoneNumber')}</DialogTitle>
      <DialogContent>
        <Box mb={1}>
          <div className="form__control">
            <Grid container>
              <Grid className="form__label" item xs={5}>{t('input.label.newPhone')}</Grid>
              <Grid item xs={7}>
                <NumberFormat
                  getInputRef={inputRef}
                  value={input.value}
                  onValueChange={(values) => handleInput(values.value)}
                  prefix="+"
                  format="+### ## ### ## ## ###"
                  placeholder={t('input.hint.newPhone')}
                  required
                />
                {input.error && (
                  <Grid className="form__error" container alignItems="center">
                    <Grid item>
                      <ErrorIcon/>
                    </Grid>
                    <Grid item>
                      <Box ml={1}>{input.error}</Box>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </div>
        </Box>
      </DialogContent>
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

        <div id="recaptcha"/>
      </DialogActions>
    </Dialog>
  )
}