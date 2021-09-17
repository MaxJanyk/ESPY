import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from '../../store'
import {IAvailablePackage} from '../../store/package/reducer'
import {postUserPackage} from '../../store/package/actionCreator'
import card_ from '../../sass/card.module.sass'
import {Box, Button, Grid} from '@material-ui/core'
import {DialogAreYouSure} from '../../component/DialogAreYouSure'

interface IProps {
  data: IAvailablePackage[] | null
}

export const BuyNewPackage = ({data}: IProps) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const [sureBuy, setSureBuy] = React.useState(false)

  return (
    <Grid className={card_.root} container direction="column">
      <Grid className={card_.title} item>{t('dashboard.buyNewPackage')}</Grid>
      <Grid className={card_.title_sub} item>Lorem Ipsum</Grid>

      {data?.map(pack => (
        <Grid className={card_.list} item key={pack.id}>
          <Box my={1}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Grid container direction="column">
                  <Grid className={card_.list__title} item>{pack.name}</Grid>
                  <Grid className={card_.list__title_sub} item>{pack.price}€</Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button className="button_warning" onClick={() => setSureBuy(true)}>
                  {t('package.buy')}
                </Button>
              </Grid>
              {sureBuy && (
                <DialogAreYouSure
                  onYes={() => dispatch(postUserPackage(pack.id))}
                  handleClose={() => setSureBuy(false)}
                />
              )}
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}