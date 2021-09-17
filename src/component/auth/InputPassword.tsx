// TODO replace component with component/InputPassword.tsx
import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {Box, Grid} from '@material-ui/core'
import {ErrorOutline as ErrorIcon} from '@material-ui/icons'

interface IProps {
  id: string
  input: {
    value: string
    error: string | null
  }
  handleInput: any
  label: string
}

export function InputPassword({id, input, handleInput, label}: IProps) {
  const {t} = useTranslation()

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 32) e.preventDefault()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let {value} = e.target

    value = value.replaceAll(/ /g, '')

    handleInput(id, value)
  }

  return (
    <div className="form__control">
      <label className="form__label" htmlFor={id}>{label}</label>
      <input
        type="password"
        id={id}
        placeholder={t('input.hint.password')}
        autoComplete="on"
        value={input.value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        required
      />
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
    </div>
  )
}