import React, { Component } from 'react'
import {
    Button,
    Container,
    Menu,
} from 'semantic-ui-react'

export default class TopBar extends Component {

    render() {

        return (
            <div>
                <Menu fixed='top' size='large'>
                    <Container>
                        <Menu.Item as='a' active>Home</Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item className='item'>
                                <Button as='a'>Log in</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </div>
        )
    }
}