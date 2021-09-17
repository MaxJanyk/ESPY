import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'

const navbarOpenWidth = 240
const navbarCloseWidth = 64

export const useAlertStyles = makeStyles(() =>
  createStyles({
    root: {boxShadow: 'none'},
    standardSuccess: {backgroundColor: '#C5F2C7'},
    severity: {textTransform: 'capitalize'}
  })
)

export const useHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    notification: {
      backgroundColor: '#EFF0F6',
      width: 40,
      height: 40,
      borderRadius: '50%',
      cursor: 'pointer',
      '& svg': {
        color: '#D6D7E3'
      },
      '& .MuiBadge-dot': {
        top: 11,
        right: 13
      }
    }
  })
)

export const useAvatarStyles = makeStyles(() =>
  createStyles({
    root: {
      cursor: 'pointer',
      '&.big': {
        width: 70,
        height: 70
      }
    }
  })
)

export const useDrawerStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '&.active .MuiDrawer-paper': {
      width: navbarOpenWidth
    },
    '& .MuiButtonBase-root': {
      paddingLeft: 19
    },
    '&.rtl .MuiButtonBase-root': {
      paddingRight: 19
    },
    whiteSpace: 'nowrap',
    '& .MuiDivider-root': {
      margin: 10,
      background: '#29292f'
    }
  },
  paper: {
    background: theme.palette.secondary.main,
    width: navbarCloseWidth,
    transition: 'ease 0.3s',
    overflowX: 'hidden'
  }
}))

export const useTriggerStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 21,
    fontSize: 25,
    '&.ltr': {
      right: 5
    },
    '&.rtl': {
      left: 5,
    },
    '& .MuiIconButton-label': {
      color: '#454550',
      '&:hover': {
        color: '#FFF'
      },
    }
  }
})

export const useListItemStyles = makeStyles({
  root: {
    paddingLeft: 21,
    color: '#949494',
    '& .MuiListItemIcon-root': {
      color: '#454550'
    },
    '&.rtl': {
      textAlign: 'right'
    }
  },
  selected: {
    color: '#FFF',
    '& .MuiListItemIcon-root': {
      color: '#FFF'
    }
  }
})
