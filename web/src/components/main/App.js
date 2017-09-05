import React, { Component } from 'react'
import TopBar from './TopBar'
import Footer from './Footer' 
import Body from './Body'
import DevTools from 'mobx-react-devtools'

export default class App extends Component {

    render() {
        return (
            // the main app content for e2e tests
            <div id="holistic">
                <DevTools />
                <TopBar />
                <Body/>
                <Footer/>
            </div>
        )
    }
}