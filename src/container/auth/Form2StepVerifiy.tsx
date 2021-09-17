import * as React from 'react'
import {useDispatch} from '../../store'
import {useLocation} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import NumberFormat from 'react-number-format'
import {signBy2Fa} from '../../store/auth/actionCreator'
import auth_ from '../../sass/auth.module.sass'
import {Box, Button, Grid} from '@material-ui/core'

export function Form2StepVerify() {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const location: any = useLocation()

  const token = location.state

  let inputRef = React.useRef<HTMLInputElement>(null)

  const [code, setCode] = React.useState('')

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(signBy2Fa(code, token))
  }

  return (
    <>
      <Grid className={auth_.content} container direction="column">
        <Grid className={auth_.title} item>
          <Box mb={6}>{t('auth.2step.title')}</Box>
        </Grid>

        <Grid item>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form__control">
              <label className="form__label" htmlFor="code">{t('input.label.verificationCode')}</label>
              <NumberFormat
                getInputRef={inputRef}
                value={code}
                onValueChange={(values) => setCode(values.value)}
                format="### ###"
                mask="_"
                required
              />
            </div>

            <Button
              type="submit"
              className={`${auth_.submit} button_large`}
              variant="contained" color="primary" disableElevation
              disabled={code.length !== 6}
            >
              {t('common.done')}
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  )
}