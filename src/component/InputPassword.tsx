import * as React from 'react'
import {Box, FormControl, Grid, IconButton} from '@material-ui/core'
import {ErrorOutline as ErrorIcon, Visibility as ShowPassIcon, VisibilityOff as HidePassIcon} from '@material-ui/icons'

interface Props {
  id: string
  input: string
  error?: string | null
  handleInput: (id: string, val: string) => void
  placeholder: string
  showPassword?: boolean
  inputProps?: {
    [key: string]: any
  }
}

export const InputPassword = ({id, input, error, handleInput, placeholder, showPassword, inputProps}: Props) => {
  const [showPass, setShowPass] = React.useState(false)
  const [autoCompleteFix, setAutoCompleteFix] = React.useState(true)

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 32) e.preventDefault()
  }

  return (
    <FormControl className="form__control" variant="outlined">
      <input
        type={showPass ? 'text' : 'password'}
        value={input}
        onChange={e => handleInput(id, e.target.value)}
        placeholder={placeholder}
        required
        readOnly={autoCompleteFix}
        onFocus={() => setAutoCompleteFix(false)}
        onKeyDown={handleKeyDown}
        {...inputProps}
      />
      {showPassword && (
        showPass ? (
          <IconButton className="form__button_inner" onClick={() => setShowPass(false)}>
            <HidePassIcon/>
          </IconButton>
        ) : (
          <IconButton className="form__button_inner" onClick={() => setShowPass(true)}>
            <ShowPassIcon/>
          </IconButton>
        )
      )}
      {error && (
        <Grid className="form__error" container alignItems="center">
          <Grid item>
            <ErrorIcon/>
          </Grid>
          <Grid item>
            <Box ml={1}>{error}</Box>
          </Grid>
        </Grid>
      )}
    </FormControl>
  )
}