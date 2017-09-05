import React, { Component } from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'

export default class body extends Component {



    render() {

        return (
            <div style={{minHeight:"80vh"}}>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Container text>
                        <Header as='h3' style={{ fontSize: '2em' }}>Welcome to HolisticJS</Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Let's start by showing a table with things!
                        </p>
                    </Container>
                    <Container text>
                        {this.props.children}
                    </Container>
                </Segment>
            </div>
        )
    }
}