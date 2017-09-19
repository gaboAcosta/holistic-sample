import React, { Component } from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'

export default class body extends Component {



    render() {

        return (
            <div style={{minHeight:"80vh"}}>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Container text>
                        {this.props.children}
                    </Container>
                </Segment>
            </div>
        )
    }
}