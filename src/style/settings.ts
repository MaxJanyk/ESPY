import {createStyles, makeStyles} from '@material-ui/core/styles'

export const useSettingsStyles = makeStyles((theme) =>
  createStyles({
    other: {
      [theme.breakpoints.up('md')]: {
        paddingLeft: 80,
        borderLeft: '1px solid #EEEEEE'
      }
    },
    label: {
      paddingRight: 20,
      lineHeight: '44px',
      fontSize: 14
    }
  })
)