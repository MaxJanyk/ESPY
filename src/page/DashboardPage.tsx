import * as React from 'react'
import {useTranslation} from 'react-i18next'
import content_ from '../sass/content.module.sass'
import card_ from '../sass/card.module.sass'
import {Box, Grid, TableCell} from '@material-ui/core'
import {Page} from '../component/Page'
import {Balance} from '../component/dashboard/Balance'
import {PackageUser} from '../component/package/User'
import {useDispatch, useSelector} from '../store'
import {getUserPackage} from '../store/package/actionCreator'
import {PackageSlider} from '../container/dashboard/PackageSlider'
import {PersonalPlan} from '../container/dashboard/PersonalPlan'
import {BuyNewPackage} from '../container/dashboard/BuyNewPackage'
import {Requests} from '../container/dashboard/Requests'
import {Table} from '../component/Table'

const balanceData = {
  balance: 500.00
}

const freePackageData = {
  id: 4324,
  packageId: 4324324,
  endDate: '2021-11-09T11:43:29.339Z',
  isRenew: false,
  package: {
    name: 'Free Package',
    isActive: true,
    description: [
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
    ],
  }
}

const tableData: any[] = []

export function DashboardPage() {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const userPackage = useSelector(state => state.package.userPackage)
  const availablePackage = useSelector(state => state.package.availablePackage)

  const slideCount = userPackage?.length

  React.useEffect(() => {
    if (userPackage === null) dispatch(getUserPackage)
  }, [userPackage, dispatch])

  const TableHeader = () => (
    <>
      <TableCell>{t('dashboard.table.package')}</TableCell>
      <TableCell>{t('dashboard.table.endDate')}</TableCell>
      <TableCell>{t('dashboard.table.remain')}</TableCell>
      <TableCell>{t('dashboard.table.performed')}</TableCell>
    </>
  )

  const TableBody = (row: any, idx: number) => (
    <>
      <TableCell>Package 1</TableCell>
      <TableCell>17.04.2021</TableCell>
      <TableCell>3200</TableCell>
      <TableCell>1800</TableCell>
    </>
  )

  return (
    <Page>
      <Grid container>
        <Grid className={content_.title} item>{t('dashboard.title')}</Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <Box height={160}>
                <Balance data={balanceData}/>
              </Box>
            </Grid>
            {userPackage && (
              <Grid item xs={12} sm={6} lg={4}>
                <PackageSlider slideCount={slideCount}>
                  {userPackage.map((el, idx) => (
                    <Box className={card_.slider__item} key={idx} height={160}>
                      <PackageUser data={el}/>
                    </Box>
                  ))}
                </PackageSlider>
              </Grid>
            )}

            <Grid item xs={12} sm={6} lg={4}>
              <Box height={160}>
                <PackageUser data={freePackageData}/>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box height={160}>
            <PersonalPlan/>
          </Box>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Box height={370}>
            <Requests data={tableData}/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box height={370}>
            <BuyNewPackage data={availablePackage}/>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Table
            title={t('dashboard.requestsMonitor')}
            header={TableHeader}
            renderBody={TableBody}
            data={tableData}
          />
        </Grid>
      </Grid>
    </Page>
  )
}