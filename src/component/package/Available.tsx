import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from '../../store'
import {postUserPackage} from '../../store/package/actionCreator'
import card_ from '../../sass/card.module.sass'
import {Box, Button, Grid} from '@material-ui/core'
import {Check as CheckIcon} from '@material-ui/icons'
import {DialogAreYouSure} from '../DialogAreYouSure'
import {IAvailablePackage} from '../../store/package/reducer'

type Props = {
  data: IAvailablePackage
}

export const PackageAvailable = ({data}: Props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const [sureBuy, setSureBuy] = React.useState(false)

  return (
    <Grid className={card_.root} container direction="column">
      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid className={card_.title} item>{data.name}</Grid>
          <Grid item>
            <div className={card_.price}>{data.price}€</div>
          </Grid>
        </Grid>
      </Grid>

      <Grid className={card_.description} item>
        {data.description.map((el, idx) => (
          <Grid key={idx} container alignItems="center">
            <Grid item><Box mr={1}><CheckIcon/></Box></Grid>
            <Grid className={card_.description__item} item>{el}</Grid>
          </Grid>
        ))}
      </Grid>

      <Grid item>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              className="button_warning"
              variant="contained" size="small" disableElevation
              onClick={() => setSureBuy(true)}
            >
              {t('package.buy')}
            </Button>

            {sureBuy && (
              <DialogAreYouSure
                onYes={() => dispatch(postUserPackage(data.id))}
                handleClose={() => setSureBuy(false)}
              />
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid className={card_.color} style={{background: data.color}}/>
    </Grid>
  )
}