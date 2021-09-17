import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'
import {useDispatch} from '../../store'
import {forgotRequest} from '../../store/auth/actionCreator'
import auth_ from '../../sass/auth.module.sass'
import {Box, Button, Grid} from '@material-ui/core'
import {ErrorOutline as ErrorIcon} from '@material-ui/icons'

interface IForgotProps {
  schema: any
}

interface IInput {
  value: string
  error: string | null
}

export function FormForgot({schema}: IForgotProps) {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  const [input, setInput] = React.useState<IInput>({
    value: '',
    error: null
  })

  const handleInput = (value: string) => {
    setInput((state: any) => ({
      ...state,
      value: value
    }))
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 32) e.preventDefault()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const data = {email: input.value}

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
      dispatch(forgotRequest(input.value, history))
    }
  }

  return (
    <Grid className={auth_.content} container direction="column">
      <Grid className={auth_.title} item>{t('auth.forgot.title')}</Grid>

      <Grid item>
        <Box mt={10} mb={3}>
          <div className={auth_.hint_light}>{t('auth.forgot.hint')}</div>
        </Box>
      </Grid>

      <Grid item>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form__control">
            <label className="form__label" htmlFor="email">{t('input.label.email')}</label>
            <input
              type="text"
              id="email"
              placeholder={t('input.label.email')}
              value={input.value}
              onChange={e => handleInput(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              autoFocus
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
          </div>

          <Button
            type="submit"
            className={`${auth_.submit} button_large`}
            variant="contained" color="primary" disableElevation
          >
            {t('auth.forgot.resetPassword')}
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}