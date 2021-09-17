import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from '../store'
import {getUserPackage} from '../store/package/actionCreator'
import content_ from '../sass/content.module.sass'
import {Box, Button, Grid} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import {Page} from '../component/Page'
import {PackageUser} from '../component/package/User'
import {PackageAvailable} from '../component/package/Available'

export function PackagePage() {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const userPackage = useSelector(state => state.package.userPackage)
  const availablePackage = useSelector(state => state.package.availablePackage)

  React.useEffect(() => {
    if (userPackage === null) dispatch(getUserPackage)
  }, [userPackage, dispatch])

  return (
    <Page>
      <Grid container justifyContent="space-between">
        <Grid className={content_.title} item>{t('package.title')}</Grid>
        <Grid item>
          <Button variant="contained" color="primary" disableElevation>{t('package.requestPersonalPlan')}</Button>
        </Grid>
      </Grid>

      <h2 className={content_.subTitle}>{t('package.yourPackage')}</h2>

      <Grid container spacing={2}>
        {userPackage ? userPackage.map((el, idx) => (
          <Grid key={idx} item xs={12} sm={6} lg={3}>
            <Box height={250}>
              <PackageUser data={el} description/>
            </Box>
          </Grid>
        )) : (
          [...Array(3)].map((el, idx) => (
            <Grid key={idx} item xs={12} sm={6} lg={3}>
              <Skeleton variant="rect" height={250}/>
            </Grid>
          ))
        )}
      </Grid>

      <Box mt={6} mb={2}>
        <h2 className={content_.subTitle}>{t('package.availablePackage')}</h2>
      </Box>

      <Grid container spacing={2}>
        {availablePackage ? availablePackage.map((el: any, idx) => (
          <Grid key={idx} item xs={12} sm={6} lg={3}>
            <Box height={250}>
              <PackageAvailable data={el}/>
            </Box>
          </Grid>
        )) : (
          [...Array(4)].map((el, idx) => (
            <Grid key={idx} item xs={12} sm={6} lg={3}>
              <Skeleton variant="rect" height={250}/>
            </Grid>
          ))
        )}
      </Grid>
    </Page>
  )
}