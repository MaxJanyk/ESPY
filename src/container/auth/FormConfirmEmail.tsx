import * as React from 'react'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import auth_ from '../../sass/auth.module.sass'
import {Box, Button, Grid} from '@material-ui/core'

export function FormConfirmEmail() {
  const {t} = useTranslation()
  const history = useHistory()

  return (
    <Grid className={auth_.content} container direction="column">
      <Grid className={auth_.title} item>{t('auth.register.title')}</Grid>

      <Grid item>
        <Box className={auth_.hint_large} mt={10} mb={3}>{t('auth.register.doneHint')}</Box>
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