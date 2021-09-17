import * as React from 'react'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import auth_ from '../../sass/auth.module.sass'
import {Box, Button, Grid} from '@material-ui/core'
import {Social} from '../../component/auth/Social'
import {InputUsername} from '../../component/auth/InputUsername'
import {InputPassword} from '../../component/auth/InputPassword'
import {isNumeric} from '../../function/number'
import {useDispatch} from '../../store'
import {getPhoneCode, signInEmail} from '../../store/auth/actionCreator'

interface IWelcomeProps {
  schema: any
}

export interface IInputWelcome {
  method: 'email' | 'phone'
  username: {
    value: string
    error: string | null
  }
  password: {
    value: string
    error: string | null
  }
}

export function FormWelcome({schema}: IWelcomeProps) {
  const {t} = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()

  const usernameRef = React.useRef<HTMLInputElement>()

  const [input, setInput] = React.useState<IInputWelcome>({
    method: 'email',
    username: {
      value: '',
      error: null
    },
    password: {
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
    setInput(state => ({
      ...state,
      password: {
        ...state.password,
        value: value
      }
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const data = {
      method: input.method,
      username: input.username.value,
      password: input.password.value
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
      const fields = ['username', 'password']

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
      else dispatch(signInEmail(input.username.value, input.password.value, history))
    }
  }

  return (
    <Grid className={auth_.content} container direction="column">
      <Grid className={auth_.title} item>{t('auth.welcome.title')}</Grid>

      <Grid item>
        <Box className={auth_.hint_light} mt={10}>{t('auth.welcome.hint')}</Box>
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

          <Button
            type="submit"
            className={`${auth_.submit} button_large`}
            variant="contained" color="primary" disableElevation
          >
            {t('auth.welcome.signIn')}
          </Button>
        </form>

        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid className="link font_medium" item onClick={() => history.push('/auth/forgot')}>
            {t('auth.welcome.forgotYourPassword')}
          </Grid>
          <Grid item>
            <Box mt={4}>
              <span className={auth_.hint}>{t('auth.welcome.noAccountYet')} </span>
              <span className="link" onClick={() => history.push('/auth/register')}>
                {t('auth.welcome.signUpNow')}
              </span>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}