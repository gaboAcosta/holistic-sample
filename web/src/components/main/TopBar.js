import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

@inject('SessionStorage') @observer
export default class TopBar extends Component {

    constructor(props){
        super(props)
        this.store = this.props.SessionStorage
        this.logout = this.logout.bind(this)
    }

    logout(){
        this.store.logout()
    }

    renderLoginButton(){
        return this.store.token ?
            <a onClick={this.logout}>Log out</a> :
            <Link to='/login'>Log in</Link>
    }

    render() {

        return (
            <div>
                <Menu fixed='top' size='large'>
                    <Container>
                        <Menu.Item>
                            <Link to='/'>Home</Link>
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item className='item'>
                                <Button>
                                    {this.renderLoginButton()}
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </div>
        )
    }
}