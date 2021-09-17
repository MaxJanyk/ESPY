import * as React from 'react'
import NumberFormat from 'react-number-format'
import {IInputWelcome} from '../../container/auth/FormWelcome'
import {IInputRegister} from '../../container/auth/FormRegister'
import {Box, Grid} from '@material-ui/core'
import {ErrorOutline as ErrorIcon} from '@material-ui/icons'

interface IProps {
  phoneRef: any
  label: string
  input: IInputWelcome | IInputRegister
  handleInput: (value: string) => void
}

export function InputUsername({phoneRef, input, label, handleInput}: IProps) {
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 32) e.preventDefault()
  }

  return (
    <div className="form__control">
      <label className="form__label" htmlFor="username">{label}</label>
      {input.method === 'phone' ? (
        <NumberFormat
          getInputRef={phoneRef}
          value={input.username.value}
          onValueChange={(values) => {
            handleInput(values.value)
          }}
          prefix="+"
          format="+### ## ### ## ## ###"
        />
      ) : (
        <input
          type="text"
          id="username"
          placeholder={label}
          value={input.username.value}
          onChange={e => handleInput(e.target.value)}
          onKeyDown={handleKeyDown}
          required
        />
      )}
      {input.username.error && (
        <Grid className="form__error" container alignItems="center">
          <Grid item>
            <ErrorIcon/>
          </Grid>
          <Grid item>
            <Box ml={1}>{input.username.error}</Box>
          </Grid>
        </Grid>
      )}
    </div>
  )
}