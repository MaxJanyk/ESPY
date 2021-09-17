import * as React from 'react'
import {useTranslation} from 'react-i18next'
import content_ from '../../sass/content.module.sass'
import {useDispatch, useSelector} from '../../store'
import {Provider} from '../../store/auth/reducer'
import {Box, Button, Grid} from '@material-ui/core'
import {DialogChangePassword} from './DialogChangePassword'
import {DialogChangePhone} from './DialogChangePhone'
import {InputPassword} from '../../component/InputPassword'
import {DialogChangeEmail} from './DialogChangeEmail'
import {updateProfile} from '../../store/user/actionCreator'

type Props = {
  input: any
  handleInput: (id: string, val: string) => void
}

type InputEvent = React.ChangeEvent<HTMLInputElement>

export const FormPersonalInfo = ({input, handleInput}: Props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const provider = useSelector(state => state.auth.provider)
  const user = useSelector(state => state.user)

  const [changePasswordOpen, setChangePasswordOpen] = React.useState(false)
  const [changePhoneOpen, setChangePhoneOpen] = React.useState(false)
  const [changeEmailOpen, setChangeEmailOpen] = React.useState(false)

  return (
    <>
      <Box className={content_.blockTitle} my={2}>{t('settings.personalInformation')}</Box>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <div className="form__control">
            <label className="form__label" htmlFor="firstname">{t('input.label.firstname')}</label>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={7}>
                <input
                  type="text"
                  id="firstname"
                  placeholder="Michael"
                  autoComplete="on"
                  maxLength={50}
                  value={input.firstname}
                  onChange={(e: InputEvent) => handleInput('firstname', e.target.value)}
                  required
                />
              </Grid>
              {user.firstname !== input.firstname && (
                <Box ml={4}>
                  <Button
                    className="button_edit"
                    variant="contained"
                    disableElevation
                    onClick={() => dispatch(updateProfile('firstname', input.firstname))}
                  >
                    {t('common.save')}
                  </Button>
                </Box>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <div className="form__control">
            <label className="form__label" htmlFor="lastname">{t('input.label.lastname')}</label>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={7}>
                <input
                  type="text"
                  id="lastname"
                  placeholder="Jones"
                  autoComplete="on"
                  maxLength={50}
                  value={input.lastname}
                  onChange={(e: InputEvent) => handleInput('lastname', e.target.value)}
                  required
                />
              </Grid>
              {user.lastname !== input.lastname && (
                <Box ml={4}>
                  <Button
                    className="button_edit"
                    variant="contained"
                    disableElevation
                    onClick={() => dispatch(updateProfile('lastname', input.lastname))}
                  >
                    {t('common.save')}
                  </Button>
                </Box>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <div className="form__control">
            <label className="form__label">{t('input.label.email')}</label>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={7}>
                <input
                  type="text"
                  placeholder="Lucy_Kirlin80@gmail.com"
                  value={input.email}
                  readOnly
                />
              </Grid>
              {(provider !== Provider.GOOGLE) && (
                <Grid item xs={12} sm={5}>
                  <Box ml={3}>
                    <Button
                      color="primary" onClick={() => setChangeEmailOpen(true)}>
                      {t('settings.changeEmail')}
                    </Button>
                  </Box>
                  {changeEmailOpen && (
                    <DialogChangeEmail handleClose={() => setChangeEmailOpen(false)}/>
                  )}
                </Grid>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
      {provider === Provider.EMAIL && (
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <div className="form__control">
              <label className="form__label">{t('input.label.password')}</label>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={7}>
                  <InputPassword
                    id="password"
                    input={input.password}
                    handleInput={handleInput}
                    placeholder={t('input.hint.passwordRepeat')}
                    showPassword
                    inputProps={
                      {readOnly: true}
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Box ml={3}>
                    <Button color="primary" onClick={() => setChangePasswordOpen(true)}>
                      {t('settings.changePassword')}
                    </Button>
                  </Box>
                  {changePasswordOpen && (
                    <DialogChangePassword handleClose={() => setChangePasswordOpen(false)}/>
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      )}
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <div className="form__control">
            <label className="form__label">{t('input.label.phone')}</label>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={7}>
                <input
                  type="text"
                  placeholder="+890000000000"
                  value={input.phone}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Box ml={3}>
                  <Button color="primary" onClick={() => setChangePhoneOpen(true)}>
                    {t('settings.changePhoneNumber')}
                  </Button>
                </Box>
                {changePhoneOpen && (
                  <DialogChangePhone input={input.phone} handleClose={() => setChangePhoneOpen(false)}/>
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  )
}