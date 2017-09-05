import React, { Component } from 'react'
import TopBar from './TopBar'
import Footer from './Footer'
import Body from './Body'

export default class App extends Component {

    render() {
        return (
            // the main app content for e2e tests
            <div id="holistic">
                <TopBar />
                <Body/>
                <Footer/>
            </div>
        )
    }
}