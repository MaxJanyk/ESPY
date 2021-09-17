import * as React from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import auth_ from '../../sass/auth.module.sass'
import {Box, Button, Grid} from '@material-ui/core'

export function FormForgotDone() {
  const {t} = useTranslation()
  const history = useHistory()
  const location: any = useLocation()

  const state = location.state

  return (
    <Grid className={auth_.content} container direction="column">
      <Grid className={auth_.title} item>{t('auth.forgot.title')}</Grid>

      <Grid item>
        <Box className={auth_.hint_large} mt={10} mb={3}>
          {t('auth.forgot.doneHint1')}
          <a href={`mailto: ${state.email}`}> {state.email} </a>
          {t('auth.forgot.doneHint2')}
        </Box>
      </Grid>

      <Grid item>
        <Button
          className={`${auth_.submit} button_large`}
          variant="contained" color="primary" disableElevation
          onClick={() => history.push('/auth')}
        >
          Ok
        </Button>
      </Grid>
    </Grid>
  )
}