import * as React from 'react'
import {useTranslation} from 'react-i18next'
import Joi from 'joi'
import {useDispatch, useSelector} from '../../store'
import {setRequestStatus} from '../../store/common/actionCreator'
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@material-ui/core'
import {useDialogStyles} from '../../style/dialog'
import {InputPassword} from '../../component/InputPassword'
import {updatePassword} from '../../store/user/actionCreator'

type Props = {
  handleClose: () => void
}

interface IInput {
  password: {
    value: string
    error: string | null
  }
  passwordRepeat: {
    value: string
    error: string | null
  }
}

const initState = {
  password: {
    value: '',
    error: null
  },
  passwordRepeat: {
    value: '',
    error: null
  }
}

export const DialogChangePassword = ({handleClose}: Props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const classes = useDialogStyles()

  const requestStatus = useSelector(state => state.common.requestStatus)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [input, setInput] = React.useState<IInput>(initState)

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const handleOnClose = React.useCallback(() => {
    handleClose()
    dispatch(setRequestStatus(false))
    setInput(initState)
  }, [dispatch, handleClose])

  React.useEffect(() => {
    if (requestStatus) handleOnClose()
  }, [handleOnClose, requestStatus])

  const passwordMessage = {
    'string.empty': t('validation.required'),
    'string.min': t('validation.min6'),
    'string.max': t('validation.max255')
  }

  const passwordValidation = Joi
    .string().required().min(6).max(255)
    .messages(passwordMessage)

  const passwordRepeatValidation = Joi
    .string().required().min(6).max(255).valid(Joi.ref('password'))
    .messages({
      ...passwordMessage,
      'any.only': t('validation.passwordRepeat')
    })

  const schema = Joi.object({
    password: passwordValidation,
    passwordRepeat: passwordRepeatValidation,
  })

  const handleInput = (fieldName: string, value: string) => {
    value = value.replaceAll(/ /g,'')

    setInput((state: any) => ({
      ...state,
      [fieldName]: {
        ...state[fieldName],
        value: value
      }
    }))
  }

  const submit = () => {
    const data = {
      password: input.password.value,
      passwordRepeat: input.passwordRepeat.value
    }

    const {error} = schema.validate(data, {abortEarly: true})

    if (error?.details) {
      const fieldName = error.details[0].path[0]
      const message = error.details[0].message

      setInput((state: any) => ({
        ...state,
        [fieldName]: {
          ...state[fieldName],
          error: message
        }
      }))
    }
    else {
      const fields = ['password', 'passwordRepeat']

      fields.forEach(el => {
        setInput((state: any) => ({
          ...state,
          [el]: {
            ...state[el],
            error: null
          }
        }))
      })

      dispatch(updatePassword(input.password.value))
    }
  }

  return (
    <Dialog
      className={`${classes.root} ${classes.wide}`}
      open={true}
      onClose={handleOnClose}
      onEntered={() => inputRef.current?.focus()}
    >
      <DialogTitle>{t('settings.changePassword')}</DialogTitle>
      <DialogContent>
        <Box mb={1}>
          <Grid container>
            <Grid className="form__label" item xs={5}>{t('input.label.password')}</Grid>
            <Grid item xs={7}>
              <InputPassword
                id="password"
                input={input.password.value}
                error={input.password.error}
                handleInput={handleInput}
                placeholder={t('input.hint.password')}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={1}>
          <Grid container>
            <Grid className="form__label" item xs={5}>{t('input.label.passwordRepeat')}</Grid>
            <Grid item xs={7}>
              <InputPassword
                id="passwordRepeat"
                input={input.passwordRepeat.value}
                error={input.passwordRepeat.error}
                handleInput={handleInput}
                placeholder={t('input.hint.passwordRepeat')}
                showPassword
              />
            </Grid>
          </Grid>
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