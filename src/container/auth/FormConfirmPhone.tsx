import * as React from 'react'
import {useTranslation} from 'react-i18next'
import NumberFormat from 'react-number-format'
import auth_ from '../../sass/auth.module.sass'
import {Box, Button, Grid} from '@material-ui/core'
import {Replay as AgainIcon} from '@material-ui/icons'
import {useDispatch} from '../../store'
import {approvePhoneCode, getPhoneCode} from '../../store/auth/actionCreator'
import {getLocalStorage, LocalStorage} from '../../function/localStorage'

export function FormConfirmPhone() {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  let inputRef = React.useRef<HTMLInputElement>(null)

  const state = getLocalStorage(LocalStorage.APPROVE_PHONE_CODE_STATE)

  const [code, setCode] = React.useState('')

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [inputRef])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const {user} = await window.confirmationResult.confirm(code)

    dispatch(approvePhoneCode(user))
  }

  const handleSendAgain = () => {
    dispatch(getPhoneCode(state.phone))
  }

  return (
    <Grid className={auth_.content} container direction="column">
      <Grid item>
        <div className="form__control">
          <label className="form__label" htmlFor="username">{t('input.label.confirmationCode')}</label>
          <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
            <Grid item>
              <NumberFormat
                getInputRef={inputRef}
                value={code}
                onValueChange={(values) => setCode(values.value)}
                format="### ###"
                mask="_"
                required
              />
            </Grid>
            <Grid item>
              <Box ml={4}>
                <Button
                  className="button_small"
                  onClick={handleSendAgain}
                  startIcon={<AgainIcon/>}
                  variant="outlined"
                  color="primary"
                  disableElevation
                >
                  {t('auth.register.sendAgain')}
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box className={auth_.hint_small} mt={1}>{t('auth.register.hint3')}</Box>
        </div>

        <Button
          type="submit"
          className={`${auth_.submit} button_large`}
          variant="contained" color="primary" disableElevation
          onClick={handleSubmit}
          disabled={code.length < 6}
        >
          {t('auth.register.createAccount')}
        </Button>
      </Grid>
    </Grid>
  )
}