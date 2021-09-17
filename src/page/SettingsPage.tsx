import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from '../store'
import {delete2FAUser, deleteUser} from '../store/user/actionCreator'
import {LocalStorage} from '../function/localStorage'
import content_ from '../sass/content.module.sass'
import {Box, Button, Grid} from '@material-ui/core'
import {FormPersonalInfo} from '../container/settings/FormPersonalInfo'
import {FormOther} from '../container/settings/FormOther'
import {Page} from '../component/Page'
import {Avatar} from '../component/Avatar'
import {DialogAreYouSure} from '../component/DialogAreYouSure'
import {Dialog2FAInput} from '../container/settings/Dialog2FAInput'
import {useSettingsStyles} from '../style/settings'

export function SettingsPage() {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const classes = useSettingsStyles()

  const user = useSelector(state => state.user)

  const [sureDeleteOpen, setSureDeleteOpen] = React.useState(false)
  const [twoFAInputOpen, setTwoFAInputOpen] = React.useState(false)

  React.useEffect(() => {
    setInput(state => ({...state, ...user}))
  }, [user])

  const [input, setInput] = React.useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    is2FAEnabled: user.is2FAEnabled,
    password: '',
    language: localStorage.getItem(LocalStorage.LANG),
  })

  const handleDelete = () => {
    if (user.is2FAEnabled) setTwoFAInputOpen(true)
    else setSureDeleteOpen(true)
  }

  const handleInput = (id: string, value: string) => {
    value = value.replaceAll( /[а-яА-Я]/g, '')

    setInput(state => ({
      ...state,
      [id]: value
    }))
  }

  const handleDeleteBy2FA = (e: any, value: string, schema: any, setInput: any) => {
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

      dispatch(delete2FAUser(value))

      setTwoFAInputOpen(false)
    }
  }

  return (
    <Page>
      <Grid container>
        <Grid className={content_.title} item>{t('settings.title')}</Grid>
      </Grid>

      <div className={content_.body}>
        <Grid container>
          {/*LEFT SIDE*/}
          <Grid item xs={12} md={7}>
            <Grid container direction="column">
              <Grid className={content_.subTitle} item>{t('settings.editProfile')}</Grid>
              <Grid item>
                <Box my={2}>
                  <Avatar size="big"/>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {/*RIGHT SIDE*/}
          <Grid item xs={12} md={5}>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button className="button_error" variant="outlined" onClick={handleDelete}>
                  {t('settings.deleteAccount')}
                </Button>
                {sureDeleteOpen && (
                  <DialogAreYouSure
                    onYes={() => dispatch(deleteUser)}
                    handleClose={() => setSureDeleteOpen(false)}
                  />
                )}
                {twoFAInputOpen && (
                  <Dialog2FAInput handleSubmit={handleDeleteBy2FA} handleClose={() => setTwoFAInputOpen(false)}/>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          {/*LEFT SIDE*/}
          <Grid item xs={12} md={7}>
            <FormPersonalInfo input={input} handleInput={handleInput}/>
          </Grid>
          {/*RIGHT SIDE*/}
          <Grid className={classes.other} item xs={12} md={5}>
            <FormOther is2FAEnabled={input.is2FAEnabled} handleInput={handleInput}/>
          </Grid>
        </Grid>
      </div>
    </Page>
  )
}