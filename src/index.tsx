import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as RouterProvider} from 'react-router-dom'
import {Provider as StoreProvider} from 'react-redux'
import {createTheme, ThemeProvider as MuiProvider} from '@material-ui/core/styles'
import './i18n'
import {store} from './store'
import App from './App'
import './sass/index.sass'
import firebaseApp from 'firebase/app'
import * as Sentry from '@sentry/react'
import {Integrations} from '@sentry/tracing'

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY,
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

firebaseApp.initializeApp(firebaseConfig)
firebaseApp.auth().languageCode = 'en'

export const firebase = firebaseApp

const theme = createTheme({
  palette: {
    primary: {
      main: '#4370E2'
    },
    secondary: {
      main: '#161624'
    },
    error: {
      main: '#F26464'
    },
    warning: {
      main: '#FFBB13'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        fontFamily: 'interSemiBold, sans-serif'
      }
    }
  },
})

ReactDOM.render(
  // <React.StrictMode>
  <RouterProvider>
    <StoreProvider store={store}>
      <MuiProvider theme={theme}>
        <App/>
      </MuiProvider>
    </StoreProvider>
  </RouterProvider>
  // </React.StrictMode>
  , document.getElementById('root')
)

export const DEFAULT_AVATAR = process.env.REACT_APP_STATIC_DEFAULT_AVATAR || '/static/media/defaultAvatar.jpeg'