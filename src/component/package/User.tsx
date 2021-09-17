import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {format} from 'date-fns'
import card_ from '../../sass/card.module.sass'
import {Box, Button, Grid} from '@material-ui/core'
import {Check as CheckIcon} from '@material-ui/icons'
import {useSelector} from '../../store'
import {IUserPackage} from '../../store/package/reducer'

type Props = {
  data: IUserPackage
  description?: boolean
  disableDate?: boolean
}

export const PackageUser = ({data, description, disableDate}: Props) => {
  const {t} = useTranslation()

  const isRtl = useSelector(state => state.common.isRtl)
  const isLtr = !isRtl

  return (
    <Grid className={card_.root} container direction="column">
      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid className={card_.title} item>{data.package.name}</Grid>
          <Grid item>
            <div className={card_.status}>
              {data.package.isActive && t('package.active')}
            </div>
          </Grid>
        </Grid>
      </Grid>

      {(disableDate === undefined || !disableDate) && (
        <Grid className={card_.expiry} item>
          {t('package.activeUntil')} {format(new Date(data.endDate), 'dd.MM.yyyy')}
        </Grid>
      )}

      {description && (
        <Grid className={card_.description} item>
          {data.package.description.map((el, idx) => (
            <Grid key={idx} container alignItems="center">
              <Grid item><Box mr={1}><CheckIcon/></Box></Grid>
              <Grid className={card_.description__item} item>{el}</Grid>
            </Grid>
          ))}
        </Grid>
      )}

      <Grid item>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Box mr={isLtr && data.isRenew ? 1 : 0} ml={isRtl ? 1 : 0}>
              <Button color="primary" size="small">{t('package.showMore')}</Button>
            </Box>
          </Grid>
          {data.isRenew && (
            <Grid item>
              <Button variant="outlined" color="primary" size="small">{t('package.renew')}</Button>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid className={card_.color} item style={{background: data.package.color}}/>
    </Grid>
  )
}