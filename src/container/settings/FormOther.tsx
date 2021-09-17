import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from '../../store'
import {Provider} from '../../store/auth/reducer'
import {setLanguage} from '../../store/common/actionCreator'
import {toggle2step} from '../../store/user/actionCreator'
import {LocalStorage} from '../../function/localStorage'
import content_ from '../../sass/content.module.sass'
import {Box, Button, FormControl, Grid, MenuItem, Select} from '@material-ui/core'
import {ExpandMore as SelectIcon} from '@material-ui/icons'
import {Dialog2FAInput} from './Dialog2FAInput'
import {Dialog2FAQr} from './Dialog2FAQr'
import {useSettingsStyles} from '../../style/settings'

type Props = {
  is2FAEnabled: any
  handleInput: (key: string, val: string) => void
}

export const FormOther = ({is2FAEnabled, handleInput}: Props) => {
  const {t, i18n} = useTranslation()
  const dispatch = useDispatch()
  const classes = useSettingsStyles()

  const twoFactorQr = useSelector(state => state.user.twoFactorQr)
  const provider = useSelector(state => state.auth.provider)

  const [twoFAQrOpen, setTwoFAQrOpen] = React.useState(false)
  const [twoFAInputOpen, setTwoFAInputOpen] = React.useState(false)

  React.useEffect(() => {
    if (twoFactorQr) setTwoFAQrOpen(true)
  }, [twoFactorQr])

  const handle2FAButton = (switchStatus: boolean) => {
    const nowEnabled = is2FAEnabled === true
    const nowDisabled = is2FAEnabled === false
    const turnOn = switchStatus
    const turnOff = !switchStatus

    if (nowDisabled && turnOn) setTwoFAQrOpen(true)
    else if (nowEnabled && turnOff) setTwoFAInputOpen(true)
  }

  const handleChangeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang)
    handleInput('language', lang)
    dispatch(setLanguage(lang))
  }

  const handle2FASubmit = (e: any, value: string, schema: any, setInput: any) => {
    e.preventDefault()

    const data = {code: value}

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

      dispatch(toggle2step(value, !is2FAEnabled))

      setTwoFAInputOpen(false)
    }
  }

  return (
    <>
      <Box className={content_.blockTitle} my={2}>{t('settings.other')}</Box>
      <table cellPadding={5}>
        <tbody>
        {provider !== Provider.PHONE && (
          <tr>
            <td className={classes.label}>{t('input.label.2stepVerification')}</td>
            <td>
              <Box width={100}>
                <Grid container wrap="nowrap">
                  <Grid item xs={6}>
                    <Button
                      className={`button_large button_narrow ${is2FAEnabled === true ? 'button_edit' : 'button_secondary'}`}
                      variant="contained"
                      disableElevation
                      onClick={() => handle2FAButton(true)}
                    >ON</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      className={`button_large button_narrow ${is2FAEnabled === false ? 'button_primary' : 'button_secondary'}`}
                      variant="contained"
                      disableElevation
                      onClick={() => handle2FAButton(false)}
                    >OFF</Button>
                  </Grid>
                </Grid>
              </Box>

              {twoFAQrOpen && (
                <Dialog2FAQr
                  qrCode={twoFactorQr}
                  handleClose={() => setTwoFAQrOpen(false)}
                  handle2FAInputOpen={() => setTwoFAInputOpen(true)}
                  is2FAEnabled={is2FAEnabled}
                />
              )}

              {twoFAInputOpen && (
                <Dialog2FAInput handleSubmit={handle2FASubmit} handleClose={() => setTwoFAInputOpen(false)}/>
              )}
            </td>
          </tr>
        )}
        <tr>
          <td className={classes.label}>{t('input.label.language')}</td>
          <td>
            <FormControl variant="outlined" fullWidth>
              <Select
                value={localStorage.getItem(LocalStorage.LANG)}
                onChange={(e: React.ChangeEvent<any>) => handleChangeLanguage(e.target.value)}
                IconComponent={SelectIcon}
                className="form__select"
              >
                <MenuItem value="en">EN</MenuItem>
                <MenuItem value="he">HE</MenuItem>
              </Select>
            </FormControl>
          </td>
        </tr>
        </tbody>
      </table>
    </>
  )
}