import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import App from 'js/App'
import Components from 'js/views/Components'
import Guarded from 'js/views/Guarded'
import Ordering from 'js/views/Ordering'
import SavedOrders from 'js/views/SavedOrders'
import NewOrderForm from 'js/views/NewOrderForm'
import routingStore from 'js/stores/RoutingStore'
import { syncHistoryWithStore } from 'mobx-react-router'

const history = syncHistoryWithStore(browserHistory, routingStore)

const Routes = () =>
    <Route component={App} path='/'>
        <IndexRedirect to='/ordering' />
        <Route component={Guarded}>
            <Route component={Ordering} path='/ordering'>
                <IndexRedirect to='new-order' />
                <Route component={NewOrderForm} path='new-order' />
                <Route component={SavedOrders} path='saved-orders' />
            </Route>
        </Route>
        <Route component={Components} path='/components' />
    </Route>

export default Routes
