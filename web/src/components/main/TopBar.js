import React, { Component } from 'react'
import {
    Button,
    Container,
    Menu,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class TopBar extends Component {

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
                                    <Link to='/login'>Log in</Link>
                                </Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </div>
        )
    }
}