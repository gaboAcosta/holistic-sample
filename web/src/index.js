
import React from 'react'
import ReactDom from 'react-dom'
import App from './components/main/App.js'

class Index extends React.Component {
    render() {
        return (
            <div>
                <App/>
            </div>
        )
    }
}

ReactDom.render(<Index/>, document.getElementById('app'))