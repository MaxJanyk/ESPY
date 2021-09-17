import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from '../../store'
import {getFreePackage} from '../../store/package/actionCreator'
import {postApikey, setGeneratedKeys} from '../../store/apikey/actionCreator'
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, MenuItem, Select
} from '@material-ui/core'
import {ErrorOutline as ErrorIcon, ExpandMore as SelectIcon} from '@material-ui/icons'
import {useDialogStyles} from '../../style/dialog'

type Props = {
  schema: any
  handleClose: () => void
}

type InputEvent = React.ChangeEvent<HTMLInputElement>

type InputState = {
  userPackagesId: {
    value: number
    error: string | null
  }
  length: {
    value: number
    error: string | null
  }
  key: undefined | string
  secret: undefined | string
}

const initInputState = {
  userPackagesId: {
    value: 0,
    error: null
  },
  length: {
    value: 24,
    error: null
  },
  key: undefined,
  secret: undefined,
}

export const DialogCreateApiKey = ({schema, handleClose}: Props) => {
  const {t} = useTranslation()
  const classes = useDialogStyles()
  const dispatch = useDispatch()

  const freePackage = useSelector(state => state.package.freePackage)
  const generatedKeys = useSelector(state => state.apikey.generatedKeys)

  const [input, setInput] = React.useState<InputState>(initInputState)

  React.useEffect(() => {
    dispatch(getFreePackage)
  }, [dispatch])

  React.useEffect(() => {
    if (generatedKeys === null) return

    setInput((state: any) => ({
      ...state,
      key: generatedKeys.key,
      secret: generatedKeys.secret
    }))

    return () => {
      setInput(initInputState)
      dispatch(setGeneratedKeys(null))
    }
  }, [dispatch, generatedKeys])

  const handleInput = (id: string, value: string) => {
    setInput((state: any) => ({
      ...state,
      [id]: {
        ...state[id],
        value: value
      }
    }))
  }

  const handleSubmit = (e: any) => {
    const data = {
      userPackagesId: input.userPackagesId.value,
      length: Number(input.length.value)
    }

    const {error} = schema.validate(data, {abortEarly: true})

    if (error?.details) {
      const fieldName = error.details[0].path[0]
      const message = error.details[0].message

      setInput((state: any) => ({
        ...state,
        [fieldName]: {
          ...state[fieldName],
          error: message
        }
      }))
    }
    else {
      const fields = ['userPackagesId', 'length']

      fields.forEach(el => {
        setInput((state: any) => ({
          ...state,
          [el]: {
            ...state[el],
            error: null
          }
        }))
      })

      dispatch(postApikey({
        ...data,
        key: input.key,
        secret: input.secret
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Dialog className={`${classes.root} ${classes.wide}`} open={true} onClose={handleClose}>
        <DialogTitle>{t('apiKey.createAPIkey')}</DialogTitle>
        <DialogContent>
          <Box mb={1}>
            <Grid container>
              <Grid className="form__label" item xs={5}>{t('apiKey.table.label')}</Grid>
              <Grid item xs={7}>
                <FormControl className="form__control" variant="outlined">
                  <Select
                    className="form__select"
                    value={input.userPackagesId.value}
                    onChange={(e: any) => handleInput('userPackagesId', e.target.value)}
                    IconComponent={SelectIcon}
                  >
                    <MenuItem key={0} value={0}>{t('common.notSelected')}</MenuItem>
                    {freePackage?.map((el: any) => (
                      <MenuItem key={el.userPackageId} value={el.userPackageId}>{el.packageName}</MenuItem>
                    ))}
                  </Select>
                  {input.userPackagesId.error && (
                    <Grid className="form__error" container alignItems="center">
                      <Grid item>
                        <ErrorIcon/>
                      </Grid>
                      <Grid item>
                        <Box ml={1}>{input.userPackagesId.error}</Box>
                      </Grid>
                    </Grid>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box className={classes.field} my={1}>
            <Grid container alignItems="center">
              <Grid className="form__label" item xs={5}>{t('apiKey.table.environment')}</Grid>
              <Grid item xs={7}>Live</Grid>
            </Grid>
          </Box>

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
                  <input type="text" defaultValue={input.key} placeholder={t('apiKey.hint')} readOnly/>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box my={1}>
            <Grid container>
              <Grid className="form__label" item xs={5}>{t('apiKey.secret')}</Grid>
              <Grid item xs={7}>
                <FormControl className="form__control" variant="outlined">
                  <input type="text" defaultValue={input.secret} placeholder={t('apiKey.hint')} readOnly/>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className="button_large button_wide"
            onClick={handleClose}
            color="primary" size="large"
            variant={generatedKeys ? 'contained' : 'text'}
          >{t('common.close')}</Button>
          {generatedKeys === null && (
            <Button
              className="button_large button_wide"
              onClick={handleSubmit}
              color="primary" variant="contained" size="large" disableElevation
            >{t('common.save')}</Button>
          )}
        </DialogActions>
      </Dialog>
    </form>
  )
}