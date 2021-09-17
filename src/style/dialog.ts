import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'

export const useDialogStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiPaper-root': {
        padding: '13px 12px'
      },
      '& h2': {
        fontSize: 24,
        fontFamily: 'interSemiBold, sans-serif'
      },
      '& .form__label': {
        fontFamily: 'interMed, sans-serif',
        textAlign: 'left'
      },
      '& .MuiDialogActions-root': {
        justifyContent: "center"
      }
    },
    wide: {
      '& .MuiPaper-root': {
        minWidth: 656
      }
    },
    field: {
      height: 44
    }
  })
)
