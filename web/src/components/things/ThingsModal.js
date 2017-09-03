import React, { Component } from 'react'
import _ from 'lodash'
import { Icon, Header, Button, Modal, Form } from 'semantic-ui-react'

export default class ThingsModal extends Component {

    constructor(props){
        super(props)
        const { target } = props
        this.state = {
            target,
        }
        this.changeName = this.changeName.bind(this)
    }

    changeName(event){
        this.setState({
            target: _.merge(this.state.target, {name: event.target.value})
        })
    }

    modalContent(){
        const {mode} = this.props
        const { name } = this.state.target
        if(mode === 'delete'){
            return(
                <div>
                    <h3><Icon name="warning sign"/> Are you sure you want to delete {name}?</h3>
                </div>
            )
        } else {
            return(
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input
                            value={name}
                            placeholder='First Name'
                            onChange={this.changeName}
                        />
                    </Form.Field>
                </Form>
            )
        }
    }

    render() {

        const { onComplete } = this.props
        const { onCancel } = this.props
        const { target } = this.state
        const { title } = this.props
        return (
            <Modal
                open={true}
                size={'tiny'}
            >
                <Header content={title} />
                <Modal.Content>
                    {this.modalContent()}
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={()=>{onComplete(target)}}>
                        <Icon name='checkmark' /> Confirm
                    </Button>
                    <Button color='red' onClick={onCancel}>
                        <Icon name='checkmark' /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}