import * as React from 'react'
import {useTranslation} from 'react-i18next'
import card_ from '../../sass/card.module.sass'
import {Button, Grid} from '@material-ui/core'

export const PersonalPlan = () => {
  const {t} = useTranslation()

  return (
    <Grid className={card_.root} container direction="column">
      <Grid className={card_.title} item>{t('dashboard.personalPlan')}</Grid>

      <Grid className={card_.description} item>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu nibh dolor velit eget
      </Grid>

      <Grid item>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button variant="outlined" color="primary" size="small">{t('dashboard.request')}</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}