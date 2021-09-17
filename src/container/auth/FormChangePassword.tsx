import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from '../../store'
import {changePassword} from '../../store/auth/actionCreator'
import auth_ from '../../sass/auth.module.sass'
import {Box, Button, Grid} from '@material-ui/core'
import {InputPassword} from '../../component/auth/InputPassword'
import {getLocalStorage, LocalStorage} from '../../function/localStorage'

interface IFormProps {
  schema: any
}

interface IInputRegister {
  password: {
    value: string
    error: string | null
  }
  passwordRepeat: {
    value: string
    error: string | null
  }
}

export function FormChangePassword({schema}: IFormProps) {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const obbCode = getLocalStorage(LocalStorage.OBB_CODE)

  const [input, setInput] = React.useState<IInputRegister>({
    password: {
      value: '',
      error: null
    },
    passwordRepeat: {
      value: '',
      error: null
    }
  })

  const handleInput = (fieldName: string, value: string) => {
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

      dispatch(changePassword(obbCode, input.password.value))
    }
  }

  return (
    <Grid className={auth_.content} container direction="column">
      <Grid className={auth_.title} item>{t('settings.changePassword')}</Grid>

      <Grid item>
        <Box mt={10}>
          <form onSubmit={handleSubmit} noValidate>
            <InputPassword
              id="password"
              input={input.password}
              label={t('input.label.password')}
              handleInput={handleInput}
            />

            <InputPassword
              id="passwordRepeat"
              input={input.passwordRepeat}
              label={t('input.label.passwordRepeat')}
              handleInput={handleInput}
            />

            <Button
              type="submit"
              className={`${auth_.submit} button_large`}
              variant="contained" color="primary" disableElevation
            >
              {t('settings.changePassword')}
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}