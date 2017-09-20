import React, { Component } from 'react'
import { Icon, Table, Button, Modal } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'

import ThingsModal from './ThingsModal'
import ThingsModalModel from '../../models/things/ThingsModalModel'

@inject('ThingsListModel') @observer
class ThingsList extends Component {

    constructor (props) {
        super(props)
        this.store = new this.props.ThingsListModel()
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
                <Table celled id="things-list">
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
                                    <Table.Row
                                        data-thing-name={thing.name}
                                        key={thing._id}
                                    >
                                        <Table.Cell>{thing.name}</Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                floated='right'
                                                icon
                                                onClick={()=>{this.openModal('update', thing)}}
                                            >
                                                <Icon name='write' id="edit-thing" /> Edit
                                            </Button>

                                            <Button
                                                floated='right'
                                                icon
                                                onClick={()=>{this.openModal('delete', thing)}}
                                            >
                                                <Icon name='trash' id="delete-thing" /> Delete
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
                                    id="add-thing"
                                    icon
                                    labelPosition='left'
                                    primary size='small'
                                    onClick={()=>{
                                        this.openModal('create', {name:''})
                                    }}
                                >
                                    <Icon name='add' id="create-thing"/> Add Thing
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