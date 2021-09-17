import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useHistory, useLocation} from 'react-router-dom'
import {Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {useDrawerStyles, useListItemStyles, useTriggerStyles} from '../../style/main'
import {
  Home as HomeIcon, Wallet as BillingIcon, Bag2 as PackagesIcon, Password as ApikeyIcon, Image as CustomApiIcon,
  InfoSquare as HelpIcon, Setting as SettingIcon
} from 'react-iconly'
import {MenuOpen as MenuIcon, Code as DeveloperIcon} from '@material-ui/icons'
import main_ from '../../sass/main.module.sass'
import {useSelector} from '../../store'

type Props = {
  navbarOpen: boolean
  setNavbarOpen: any
}

export function Navbar({navbarOpen, setNavbarOpen}: Props) {
  const {t} = useTranslation()
  const location = useLocation()
  const history = useHistory()

  const isRtl = useSelector(state => state.common.isRtl)

  const drawerClasses = useDrawerStyles()
  const listItemClasses = useListItemStyles()
  const triggerClasses = useTriggerStyles()

  const data1 = [
    {label: t('drawer.dashboard'), icon: <HomeIcon filled size={25}/>, url: '/'},
    {label: t('drawer.billing'), icon: <BillingIcon filled size={25} set="bulk"/>, url: '/billing'},
    {label: t('drawer.packages'), icon: <PackagesIcon filled size={25} set="bulk"/>, url: '/packages'},
    {label: t('drawer.apiKeys'), icon: <ApikeyIcon filled size={25}/>, url: '/apikeys'},
    {label: t('drawer.customAPI'), icon: <CustomApiIcon filled size={25}/>, url: '/customapi'},
    {label: t('drawer.developer'), icon: <DeveloperIcon/>, url: '/developer'},
  ]

  const data2 = [
    {label: t('drawer.helpAndSupport'), icon: <HelpIcon filled size={25}/>, url: '/help'},
    {label: t('drawer.settings'), icon: <SettingIcon filled size={25} set="bulk"/>, url: '/settings'},
  ]

  let navbarClassName = navbarOpen ? 'active' : ''
  navbarClassName = `${navbarClassName} ${isRtl ? 'rtl' : ''}`

  const logoClassName = navbarOpen ? main_.navbarHeader__logo : main_.navbarHeader__logo_inactive
  const triggerClassName = isRtl ? 'rtl' : 'ltr'
  const listItemClassname = isRtl ? 'rtl' : ''

  return (
    <Drawer
      classes={drawerClasses}
      className={navbarClassName}
      anchor={isRtl ? 'right' : 'left'}
      onClose={() => setNavbarOpen(false)}
      variant="permanent"
    >
      <Grid className={main_.navbarHeader} container justifyContent="space-between" alignItems="center">
        <Grid item>
          <div onClick={() => history.push('/')} className={logoClassName}/>
        </Grid>
        <Grid className={main_.trigger} item>
          <IconButton className={triggerClassName} classes={triggerClasses} onClick={() => setNavbarOpen(!navbarOpen)}>
            <MenuIcon/>
          </IconButton>
        </Grid>
      </Grid>

      <Divider/>

      <List>
        {data1.map(el => (
          <ListItem
            key={el.label}
            className={listItemClassname}
            classes={listItemClasses}
            onClick={() => history.push(el.url)}
            selected={location.pathname === el.url}
            button
          >
            <ListItemIcon>{el.icon}</ListItemIcon>
            <ListItemText primary={el.label}/>
          </ListItem>
        ))}
      </List>

      <Divider/>

      <List>
        {data2.map(el => (
          <ListItem
            key={el.label}
            className={listItemClassname}
            classes={listItemClasses}
            onClick={() => history.push(el.url)}
            selected={location.pathname === el.url}
            button
          >
            <ListItemIcon>{el.icon}</ListItemIcon>
            <ListItemText primary={el.label}/>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}