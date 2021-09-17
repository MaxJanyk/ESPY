import * as React from 'react'
import {useTranslation} from 'react-i18next'
import auth_ from '../../sass/auth.module.sass'
import {Box, Button, Grid} from '@material-ui/core'
import {Social} from '../../component/auth/Social'
import {InputUsername} from '../../component/auth/InputUsername'
import {InputPassword} from '../../component/auth/InputPassword'
import {getPhoneCode, signUpEmail} from '../../store/auth/actionCreator'
import {useDispatch} from '../../store'
import {isNumeric} from '../../function/number'

interface IWelcomeProps {
  schema: any
}

export interface IInputRegister {
  method: 'email' | 'phone'
  username: {
    value: string
    error: string | null
  }
  password: {
    value: string
    error: string | null
  }
  passwordRepeat: {
    value: string
    error: string | null
  }
}

export function FormRegister({schema}: IWelcomeProps) {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const usernameRef = React.useRef<HTMLInputElement>()

  const [input, setInput] = React.useState<IInputRegister>({
    method: 'email',
    username: {
      value: '',
      error: null
    },
    password: {
      value: '',
      error: null
    },
    passwordRepeat: {
      value: '',
      error: null
    }
  })

  const handleInputUsername = (value: string) => {
    value = value.replaceAll(/ /g,'')

    if (isNumeric(value) || value.startsWith('+')) {
      value = value.replaceAll('+', '')

      setInput(state => ({
        ...state,
        method: 'phone',
        username: {
          ...state.username,
          value: value
        }
      }))

      setTimeout(() => {
        const usernameInput = usernameRef.current
        usernameInput?.focus()
      })
    }
    else {
      setInput(state => ({
        ...state,
        method: 'email',
        username: {
          ...state.username,
          value: value
        }
      }))
    }
  }

  const handleInputPassword = (fieldName: string, value: string) => {
    value = value.replaceAll(/ /g,'')

    setInput((state: any) => ({
      ...state,
      [fieldName]: {
        ...state[fieldName],
        value: value
      }
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const data = {
      method: input.method,
      username: input.username.value,
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
      const fields = ['username', 'password', 'passwordRepeat']

      fields.forEach(el => {
        setInput((state: any) => ({
          ...state,
          [el]: {
            ...state[el],
            error: null
          }
        }))
      })

      if (input.method === 'phone') dispatch(getPhoneCode(input.username.value))
      else dispatch(signUpEmail(input.username.value, input.password.value))
    }
  }

  return (
    <Grid className={auth_.content} container direction="column">
      <Grid className={auth_.title} item>{t('auth.register.title')}</Grid>

      <Grid item>
        <Grid item>
          <Box className={auth_.hint} mt={3}>{t('auth.register.hint')}</Box>
          <Box className={auth_.hint_light} mt={2}>{t('auth.register.hint2')}</Box>
        </Grid>
      </Grid>

      <Social/>

      <Grid item>
        <form onSubmit={handleSubmit} noValidate>
          <InputUsername
            phoneRef={usernameRef}
            input={input}
            handleInput={handleInputUsername}
            label={t('input.label.emailOrPhone')}
          />
          {input.method === 'email' && (
            <InputPassword
              id="password"
              input={input.password}
              label={t('input.label.password')}
              handleInput={handleInputPassword}
            />
          )}
          {input.method === 'email' && (
            <InputPassword
              id="passwordRepeat"
              input={input.passwordRepeat}
              label={t('input.label.passwordRepeat')}
              handleInput={handleInputPassword}
            />
          )}

          <Button
            type="submit"
            className={`${auth_.submit} button_large`}
            variant="contained" color="primary" disableElevation
          >
            {t('auth.register.submit')}
          </Button>
        </form>

        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid className={`${auth_.hint_small} text_center font_medium`} item>{t('auth.register.licence')}</Grid>
          <Grid className={`${auth_.hint_small} font_medium link_underline`} item>
            {t('auth.register.licence2')}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}