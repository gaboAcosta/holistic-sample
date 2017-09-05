import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { Route } from 'react-router-dom'

import App from './App'
import ThingsList from '../things/ThingsList'
import Login from '../auth/Login'

const RouterSetup = () => (
    <Router>
        <div>
            <App>
                <Route exact path="/" component={ThingsList} />
                <Route exact path="/login" component={Login} />
            </App>
        </div>
    </Router>
)

export default RouterSetup