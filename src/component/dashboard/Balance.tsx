import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {Box, Button, Grid} from '@material-ui/core'
import {Add as AddIcon} from '@material-ui/icons'
import card_ from '../../sass/card.module.sass'

interface IBalanceProps {
  data: {
    balance: number
  }
}

export function Balance({data}: IBalanceProps) {
  const {t} = useTranslation()

  return (
    <Grid className={card_.root} container direction="column" justifyContent="space-between">
      <Grid className={card_.title} item>{t('dashboard.balance')}</Grid>
      <Grid className={card_.balance} item>
        <Box mb={2}>{data.balance} €</Box>
      </Grid>
      <Grid className={card_.balance} container item justifyContent="flex-end">
        <Button
          className="button_medium"
          startIcon={<AddIcon/>}
          variant="contained" color="primary" disableElevation size="small"
        >{t('common.add')}</Button>
      </Grid>
    </Grid>
  )
}