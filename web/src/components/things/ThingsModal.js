import React, { Component } from 'react'
import { Icon, Header, Button, Modal, Form } from 'semantic-ui-react'
import { observer } from 'mobx-react'

@observer
class ThingsModal extends Component {

    get store () {
        return this.props.store
    }

    constructor(props){
        super(props)
        this.changeName = this.changeName.bind(this)
        this.submit = this.submit.bind(this)
    }

    changeName(event){
        this.store.updateTarget(event.target.value)
    }

    renderWarning () {
        const { name } = this.store.target
        return(
            <div>
                <h3><Icon name="warning sign"/> Are you sure you want to delete {name}?</h3>
            </div>
        )
    }

    renderForm () {
        const { name } = this.store.target
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

    modalContent(){
        const {mode} = this.store

        if(mode === 'delete'){
            return this.renderWarning()
        } else {
            return this.renderForm()
        }
    }

    submit () {
        this.store.submitTarget()
            .then(()=>{
                this.props.onClose()
            })
    }

    cancel () {
        this.props.onClose()
    }


    render() {
        console.log('inside the render!')
        const { title } = this.store
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
                    <Button color='green' onClick={this.submit}>
                        <Icon name='checkmark' /> Confirm
                    </Button>
                    <Button color='red' onClick={this.cancel}>
                        <Icon name='checkmark' /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ThingsModal