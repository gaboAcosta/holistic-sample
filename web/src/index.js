
import React from 'react'
import ReactDom from 'react-dom'
import Main from './components/Main.jsx'

class App extends React.Component {
    render() {
        return (
            <div>
                <Main/>
            </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById('app'))