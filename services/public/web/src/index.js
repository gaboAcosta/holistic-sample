
import React from 'react'
import ReactDom from 'react-dom'
import RouterSetup from './components/main/RouterSetup'
import { Provider } from 'mobx-react'
import GetStores from './models'

const stores = GetStores()

class Index extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <RouterSetup />
            </Provider>
        )
    }
}

ReactDom.render(<Index/>, document.getElementById('app'))