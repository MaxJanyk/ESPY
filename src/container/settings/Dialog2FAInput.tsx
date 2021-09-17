import * as React from 'react'
import NumberFormat from 'react-number-format'
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import Joi from 'joi'
import {useDialogStyles} from '../../style/dialog'
import {ErrorOutline as ErrorIcon} from '@material-ui/icons'

type Props = {
  handleClose: any
  handleSubmit: (e: any, value: string, schema: any, setInput: any) => void
}

const initInputState = {
  value: '',
  error: null
}

export const Dialog2FAInput = ({handleClose, handleSubmit}: Props) => {
  const {t} = useTranslation()
  const classes = useDialogStyles()

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [input, setInput] = React.useState(initInputState)

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const codeValidation = Joi
    .string().required().min(6)
    .messages({
      'string.empty': t('validation.required'),
      'string.min': t('validation.min6')
    })

  const schema = Joi.object({
    code: codeValidation
  })

  const handleInput = (value: string) => {
    setInput(state => ({...state, value}))
  }

  return (
    <Dialog
      className={`${classes.root} ${classes.wide}`}
      open={true}
      onClose={handleClose}
      onEntered={() => inputRef.current?.focus()}
    >
      <DialogTitle>{t('auth.2step.title')}</DialogTitle>
      <DialogContent>
        <Box mb={1}>
          <div className="form__control">
            <Grid container>
              <Grid className="form__label" item xs={5}>{t('input.label.verificationCode')}</Grid>
              <Grid item xs={7}>
                <form onSubmit={e => handleSubmit(e, input.value, schema, setInput)} noValidate>
                  <NumberFormat
                    getInputRef={inputRef}
                    value={input.value}
                    onValueChange={(values) => handleInput(values.value)}
                    mask="_"
                    format="# # # # # #"
                  />
                </form>

                {input.error && (
                  <Grid className="form__error" container alignItems="center">
                    <Grid item>
                      <ErrorIcon/>
                    </Grid>
                    <Grid item>
                      <Box ml={1}>{input.error}</Box>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          className="button_large button_wide"
          onClick={handleClose}
          color="primary" size="large"
        >{t('common.close')}</Button>
        <Button
          type="submit"
          className="button_large button_wide"
          color="primary" variant="contained" size="large" disableElevation
          onClick={e => handleSubmit(e, input.value, schema, setInput)}
        >{t('common.save')}</Button>
      </DialogActions>
    </Dialog>
  )
}