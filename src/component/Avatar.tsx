import * as React from 'react'
import {useSelector} from '../store'
import {useAvatarStyles} from '../style/main'
import {Avatar as MuiAvatar} from '@material-ui/core'

type Props = {
  size: 'big' | 'small'
}

export const Avatar = ({size}: Props) => {
  const classes = useAvatarStyles()

  const user = useSelector(state => state.user)

  let avatar: any = user.avatar
  let fullName = ''

  if (user.avatar === null) {
    if (user.firstname && user.lastname) {
      fullName = `${user.firstname} ${user.lastname}`
      avatar += ''
    }
  }

  return <MuiAvatar className={size} classes={classes} src={avatar} alt={fullName}/>
}