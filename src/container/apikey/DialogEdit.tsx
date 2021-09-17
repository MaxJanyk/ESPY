import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from '../../store'
import {editApikey, generateKeys, setGeneratedKeys} from '../../store/apikey/actionCreator'
import {setRequestStatus} from '../../store/common/actionCreator'
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid} from '@material-ui/core'
import {ErrorOutline as ErrorIcon} from '@material-ui/icons'
import {useDialogStyles} from '../../style/dialog'

type Data = {
  id: number
  length: number
  key: string
  secret: string
}

type Props = {
  data: Data
  schema: any
  handleClose: () => void
}

type InputEvent = React.ChangeEvent<HTMLInputElement>

export const DialogEditApikey = ({data, schema, handleClose}: Props) => {
  const {t} = useTranslation()
  const classes = useDialogStyles()
  const dispatch = useDispatch()

  const generatedKeys = useSelector(state => state.apikey.generatedKeys)
  const requestStatus = useSelector(state => state.common.requestStatus)

  const [input, setInput] = React.useState({
    length: {
      value: data.length,
      error: null
    },
    key: data.key,
    secret: data.secret
  })
  const [disableGenerate, setDisableGenerate] = React.useState(false)
  const [timeoutId, setTimeoutId] = React.useState<any>(null)

  const handleOnClose = React.useCallback(() => {
    handleClose()
    dispatch(setRequestStatus(false))
    dispatch(setGeneratedKeys(null))
    clearInterval(timeoutId)
  }, [dispatch, handleClose, timeoutId])

  React.useEffect(() => {
    if (requestStatus) handleOnClose()
  }, [requestStatus, handleOnClose])

  React.useEffect(() => {
    if (generatedKeys) {
      setInput(state => ({
        ...state,
        key: generatedKeys.key,
        secret: generatedKeys.secret
      }))
    }
  }, [generatedKeys])

  const handleInput = (id: string, value: string) => {
    setInput((state: any) => ({
      ...state,
      [id]: {
        ...state[id],
        value: value
      }
    }))
  }

  const validate = () => {

    const {error} = schema.validate({length: input.length.value}, {abortEarly: true})

    if (error?.details) {
      console.log(error.details)
      const fieldName = error.details[0].path[0]
      const message = error.details[0].message

      setInput((state: any) => ({
        ...state,
        [fieldName]: {
          ...state[fieldName],
          error: message
        }
      }))
      return false
    }
    else {
      const fields = ['length']

      fields.forEach(el => {
        setInput((state: any) => ({
          ...state,
          [el]: {
            ...state[el],
            error: null
          }
        }))
      })

      return true
    }
  }

  const handleGenerate = () => {
    const isValid = validate()

    if (isValid) {
      dispatch(generateKeys(input.length.value))

      setDisableGenerate(true)
      const timeoutId = setTimeout(() => setDisableGenerate(false), 15000)
      setTimeoutId(timeoutId)
    }
  }

  const handleSubmit = (e: any) => {
    const isValid = validate()

    if (isValid) {
      dispatch(editApikey({
        ...input,
        id: data.id,
        length: Number(input.length.value)
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Dialog className={`${classes.root} ${classes.wide}`} open={true} onClose={handleClose}>
        <DialogTitle>{t('apiKey.editAPIkey')}</DialogTitle>
        <DialogContent>
          <Box my={1}>
            <Grid container>
              <Grid className="form__label" item xs={5}>{t('apiKey.length')}</Grid>
              <Grid item xs={7}>
                <FormControl className="form__control" variant="outlined">
                  <input
                    type="number"
                    value={input.length.value}
                    onChange={(e: InputEvent) => handleInput('length', e.target.value)}
                  />
                  {input.length.error && (
                    <Grid className="form__error" container alignItems="center">
                      <Grid item>
                        <ErrorIcon/>
                      </Grid>
                      <Grid item>
                        <Box ml={1}>{input.length.error}</Box>
                      </Grid>
                    </Grid>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box my={1}>
            <Grid container>
              <Grid className="form__label" item xs={5}>{t('apiKey.key')}</Grid>
              <Grid item xs={7}>
                <FormControl className="form__control" variant="outlined">
                  <input
                    key={input.key}
                    type="text"
                    value={input.key}
                    placeholder={t('apiKey.hint')}
                    readOnly
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box my={1}>
            <Grid container>
              <Grid className="form__label" item xs={5}>{t('apiKey.secret')}</Grid>
              <Grid item xs={7}>
                <FormControl className="form__control" variant="outlined">
                  <input
                    key={input.secret}
                    type="text"
                    value={input.secret}
                    placeholder={t('apiKey.hint')}
                    readOnly
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className="button_large button_wide"
            onClick={handleOnClose}
            color="primary" size="large"
          >{t('common.close')}</Button>
          <Button
            className="button_large button_wide"
            onClick={handleGenerate}
            color="primary" size="large" variant="outlined"
            disabled={disableGenerate}
          >{t('common.generate')}</Button>
          <Button
            className="button_large button_wide"
            onClick={handleSubmit}
            color="primary" variant="contained" size="large" disableElevation
          >{t('common.save')}</Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}