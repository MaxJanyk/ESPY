import * as React from 'react'
import {useTranslation} from 'react-i18next'
import card_ from '../../sass/card.module.sass'
import {Box, Grid} from '@material-ui/core'

interface IProps {
  data: any[] | null
}

export const Requests = ({data}: IProps) => {
  const {t} = useTranslation()

  return (
    <Box height={370}>
      <Grid className={card_.root} container>
        <Grid className={card_.title} item>{t('dashboard.requests')}</Grid>
      </Grid>
    </Box>
  )
}