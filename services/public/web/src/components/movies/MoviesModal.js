import React, { Component } from 'react'
import { Icon, Header, Button, Modal, Form } from 'semantic-ui-react'
import { observer } from 'mobx-react'

@observer
class MoviesModal extends Component {

    get store () {
        return this.props.store
    }

    constructor(props){
        super(props)
        this.changeName = this.changeName.bind(this)
        this.changeScore = this.changeScore.bind(this)
        this.submit = this.submit.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    changeName(event){
        const name = event.target.value
        this.store.updateTarget({ name })
    }

    changeScore(event){
        const score = event.target.value
        this.store.updateTarget({ score })
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
        const { score } = this.store.target
        return(
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <input
                        value={name}
                        id="movie-name"
                        placeholder='First Name'
                        onChange={this.changeName}
                    />
                    <label>Score</label>
                    <input
                        value={score}
                        id="movie-score"
                        placeholder='Score'
                        onChange={this.changeScore}
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
        const { title } = this.store
        return (
            <Modal
                id="movies-modal"
                open={true}
                size={'tiny'}
            >
                <Header content={title} />
                <Modal.Content>
                    {this.modalContent()}
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='green'
                        onClick={this.submit}
                        id="confirm-movie-modal"
                    >
                        <Icon name='checkmark' /> Confirm
                    </Button>
                    <Button
                        color='red'
                        onClick={this.cancel}
                        id="cancel-movie-modal"
                    >
                        <Icon name='checkmark' /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default MoviesModal