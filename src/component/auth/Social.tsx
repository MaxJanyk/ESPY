import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch} from '../../store'
import {signByProvider} from '../../store/auth/actionCreator'
import auth_ from '../../sass/auth.module.sass'
import {Grid, Button} from '@material-ui/core'
import GoogleIcon from '../../asset/icons/google.svg'
import FbIcon from '../../asset/icons/fb.svg'
import MicrosoftIcon from '../../asset/icons/microsoft.svg'
import {useHistory} from 'react-router-dom'

export function Social() {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <Grid item>
      <div className={auth_.social}>
        <Button
          className={`button_large ${auth_.social__btn}`}
          variant="outlined" fullWidth={true}
          onClick={() => dispatch(signByProvider('google', history))}
        >
          <img alt="edit" src={GoogleIcon}/>
        </Button>
        <Button
          className={`button_large ${auth_.social__btn} ${auth_.social__btn_fb}`}
          fullWidth={true}
          onClick={() => dispatch(signByProvider('facebook', history))}
        >
          <img alt="edit" src={FbIcon}/>
        </Button>
        <Button
          className={`button_large ${auth_.social__btn} ${auth_.social__btn_microsoft}`}
          fullWidth={true}
          onClick={() => dispatch(signByProvider('microsoft.com', history))}
        >
          <img alt="edit" src={MicrosoftIcon}/>
        </Button>
      </div>

      <div className={auth_.or}>
        <hr/>
        <span>{t('auth.or')}</span>
        <hr/>
      </div>
    </Grid>
  )
}