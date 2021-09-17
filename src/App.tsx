import React from 'react'
import {Redirect, Route, Router, Switch} from 'react-router'
import {AuthPage} from './page/AuthPage'
import {DashboardPage} from './page/DashboardPage'
import {useSelector} from './store'
import Snackbar from './component/Snackbar'
import {createBrowserHistory} from 'history'
import {PackagePage} from './page/PackagePage'
import {ApikeyPage} from './page/ApikeyPage'
import {SettingsPage} from './page/SettingsPage'

export const history = createBrowserHistory()

type PrivateRouteProps = {
  component: React.ComponentType<any> // TODO list all component's props
  exact?: boolean
  path: string
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const {component: Component, ...rest} = props
  const token = useSelector(state => state.auth.token)

  return (
    <Route {...rest} render={props => (
      token ? <Component {...props} /> : <Redirect to="/auth"/>
    )}/>
  )
}

function App() {
  const language = useSelector(state => state.common.language)

  const className = language === 'he' ? 'rtl' : ''

  return (
    <div className={className}>
      <Router history={history}>
        <Switch>
          <Route path="/auth" component={AuthPage}/>
          <PrivateRoute path="/packages" component={PackagePage}/>
          <PrivateRoute path="/apikeys" component={ApikeyPage}/>
          <PrivateRoute path="/settings" component={SettingsPage}/>
          <PrivateRoute path="/" component={DashboardPage}/>
        </Switch>
      </Router>
      <Snackbar/>
    </div>
  )
}

export default App
