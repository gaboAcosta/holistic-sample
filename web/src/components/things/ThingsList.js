import React, { Component } from 'react'
import { Icon, Table, Button, Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react'

import ThingsModal from './ThingsModal'
import ThingsModalModel from '../../models/things/ThingsModalModel'


@observer
class ThingsList extends Component {

    get store(){
        return this.props.store
    }

    constructor (props) {
        super(props)
    }

    componentDidMount () {
        this.fetchThings()
    }

    fetchThings () {
        this.store.fetchThings()
    }

    openModal (mode, target) {
        this.store.openModal(mode, target)
    }

    displayModal () {
        const { open } = this.store.modal
        const { target } = this.store.modal
        const { mode } = this.store.modal
        const title = `${mode} a thing!`
        console.log('asking to open modal!')
        console.log(open)
        if(open) {
            return this.renderModal(target, mode, title)
        }
    }

    renderModal(target, mode, title){
        const store = new ThingsModalModel({
            target: Object.assign({}, target),
            mode,
            title
        })

        return (
            <ThingsModal
                onClose={()=>{
                    this.store.closeModal()
                    this.fetchThings()
                }}
                store={store}
            />
        )
    }

    render () {

        const { things } = this.store

        return (
            <div>
                {this.displayModal()}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            things.map((thing) => {
                                return(
                                    <Table.Row key={thing._id}>
                                        <Table.Cell>{thing.name}</Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                floated='right'
                                                icon
                                                onClick={()=>{this.openModal('update', thing)}}
                                            >
                                                <Icon name='write' /> Edit
                                            </Button>

                                            <Button
                                                floated='right'
                                                icon
                                                onClick={()=>{this.openModal('delete', thing)}}
                                            >
                                                <Icon name='trash' /> Delete
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    primary size='small'
                                    onClick={()=>{
                                        this.openModal('create', {name:''})
                                    }}
                                >
                                    <Icon name='add' /> Add Thing!
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}

export default ThingsList