import React from 'react'
import { Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import history from '../../models/history'

import App from './App'
import UsersList from '../users/UsersList'
import ThingsList from '../things/ThingsList'
import Login from '../auth/Login'

const RouterSetup = () => (
    <Router history={history}>
        <div>
            <App>
                <Route exact path="/" component={ThingsList} />
                <Route exact path="/admin/users" component={UsersList} />
                <Route exact path="/login" component={Login} />
            </App>
        </div>
    </Router>
)

export default RouterSetup