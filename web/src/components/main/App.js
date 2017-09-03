import React, { Component } from 'react'
import TopBar from './TopBar'
import Footer from './Footer'
import Body from './Body'

export default class App extends Component {

    render() {

        return (
            <div>
                <TopBar />
                <Body/>
                <Footer/>
            </div>
        )
    }
}