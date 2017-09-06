import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'

@inject('LoginModel') @observer
class Login extends React.Component {

    constructor(props){
        super(props)
        this.store = new this.props.LoginModel()
        this.updatePassword = this.updatePassword.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.tryLogin = this.tryLogin.bind(this)
    }

    updateEmail(event){
        this.store.updateEmail(event.target.value)
    }

    updatePassword(event){
        this.store.updatePassword(event.target.value)
    }

    tryLogin(){
        this.store.tryLogin()
    }

    render(){
        return(
            <div className='login-form'>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    onChange={this.updateEmail}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.updatePassword}
                                />

                                <Button
                                    color='teal'
                                    fluid size='large'
                                    onClick={this.tryLogin}
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

}

export default Login