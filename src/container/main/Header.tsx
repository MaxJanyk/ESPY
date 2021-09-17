import * as React from 'react'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from '../../store'
import {signOut} from '../../store/auth/actionCreator'
import main_ from '../../sass/main.module.sass'
import {Badge, Box, Grid, Menu, MenuItem} from '@material-ui/core'
import {Notification as NotificationIcon} from 'react-iconly'
import {useHeaderStyles} from '../../style/main'
import {Avatar} from '../../component/Avatar'

export const Header = () => {
  const classes = useHeaderStyles()
  const {t} = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()

  const isRtl = useSelector(state => state.common.isRtl)
  const isLtr = !isRtl

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Grid className={main_.header} container justifyContent="flex-end">
      <Grid item>
        <Badge className={classes.notification} color="error" overlap="circular" badgeContent="" variant="dot">
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <NotificationIcon set="bold"/>
            </Grid>
          </Grid>
        </Badge>
      </Grid>
      <Grid item>
        <Box ml={isLtr ? 2 : 0} mr={isRtl ? 2 : 0} onClick={handleClick}>
          <Avatar size="small"/>
        </Box>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleClose()
              history.push('/settings')
            }}
          >
            {t('header.editProfile')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose()
              dispatch(signOut())
            }}
          >
            {t('header.logout')}
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )
}