import * as React from 'react'
import auth_ from '../sass/auth.module.sass'
import {Backdrop, CircularProgress, Grid} from '@material-ui/core'
import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useSelector} from '../store'
import Joi from 'joi'
import {FormWelcome} from '../container/auth/FormWelcome'
import {FormForgot} from '../container/auth/FormForgot'
import {FormForgotDone} from '../container/auth/FormForgotDone'
import {FormRegister} from '../container/auth/FormRegister'
import {FormConfirmPhone} from '../container/auth/FormConfirmPhone'
import {FormConfirmEmail} from '../container/auth/FormConfirmEmail'
import {Form2StepVerify} from '../container/auth/Form2StepVerifiy'
import {FirebaseHandler} from '../container/auth/FirebaseHandler'
import {FormChangePassword} from '../container/auth/FormChangePassword'

export function AuthPage() {
  const {path} = useRouteMatch()
  const {t} = useTranslation()
  const history = useHistory()

  const {loading} = useSelector(state => state.auth)

  const methodValidation = Joi.string().required().valid('email', 'phone')

  const emailValidation = Joi
    .string().required().min(6).max(320).regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .messages({
      'string.empty': t('validation.required'),
      'string.min': t('validation.min6'),
      'string.max': t('validation.max320'),
      'string.pattern.base': t('validation.email')
    })

  const phoneValidation = Joi
    .string().required().regex(/^[0-9]{11,15}$/)
    .messages({
      'string.empty': t('validation.required'),
      'string.pattern.base': t('validation.phone')
    })

  const usernameValidation = Joi.when('method', {
    is: 'email',
    then: emailValidation,
    otherwise: phoneValidation
  })

  const passwordMessage = {
    'string.empty': t('validation.required'),
    'string.min': t('validation.min6'),
    'string.max': t('validation.max255')
  }

  const passwordValidation = Joi
    .string().required().min(6).max(255)
    .messages(passwordMessage)

  const passwordRepeatValidation = Joi
    .string().required().min(6).max(255).valid(Joi.ref('password'))
    .messages({
      ...passwordMessage,
      'any.only': t('validation.passwordRepeat')
    })

  const schemaRegister = Joi.object({
    method: methodValidation,
    username: usernameValidation,
    password: Joi.when('method', {
      is: 'email',
      then: passwordValidation,
      otherwise: Joi.string().allow('')
    }),
    passwordRepeat: Joi.when('method', {
      is: 'email',
      then: passwordRepeatValidation,
      otherwise: Joi.string().allow('')
    })
  })

  const schemaWelcome = Joi.object({
    method: methodValidation,
    username: usernameValidation,
    password: Joi.when('method', {
      is: 'email',
      then: passwordValidation,
      otherwise: Joi.string().allow('')
    })
  })

  const schemaForgot = Joi.object({
    email: emailValidation
  })

  const schemaChangePass = Joi.object({
    password: passwordValidation,
    passwordRepeat: passwordRepeatValidation,
  })

  return (
    <>
      <div id="recaptcha"/>

      <Backdrop open={loading} style={{zIndex: 9999}}>
        <CircularProgress color="primary" style={{zIndex: 99999}}/>
      </Backdrop>

      <Grid className={auth_.root} container>
        <Grid className={auth_.logo} item xs={12} md={3}>
          <div className={auth_.logo__image} onClick={() => history.push('/auth')}/>
        </Grid>
        <Grid item xs={12} md={9}>
          <Switch>
            <Route path={path} exact component={() => <FormWelcome schema={schemaWelcome}/>}/>
            <Route path={`${path}/forgot`} exact component={() => <FormForgot schema={schemaForgot}/>}/>
            <Route path={`${path}/forgot/done`} component={FormForgotDone}/>
            <Route path={`${path}/register`} exact component={() => <FormRegister schema={schemaRegister}/>}/>
            <Route path={`${path}/register/phone`} component={FormConfirmPhone}/>
            <Route path={`${path}/firebase`} component={FirebaseHandler}/>
            <Route path={`${path}/register/email`} component={FormConfirmEmail}/>
            <Route path={`${path}/change/password`} component={() => <FormChangePassword schema={schemaChangePass}/>}/>
            <Route path={`${path}/2step`} component={Form2StepVerify}/>
          </Switch>
        </Grid>
      </Grid>
    </>
  )
}