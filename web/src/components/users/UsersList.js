import React, { Component } from 'react'
import { Icon, Table, Button, Modal } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'

import UserModal from './UserModal'
import UserModalModel from '../../models/users/UserModalModel'

@inject('UsersListModel')
@observer
class UsersList extends Component {

    constructor (props) {
        super(props)
        this.store = new this.props.UsersListModel()
    }

    componentDidMount () {
        this.fetchUsers()
    }

    fetchUsers () {
        this.store.fetchUsers()
    }

    openModal (mode, target) {
        this.store.openModal(mode, target)
    }

    displayModal () {
        const { open } = this.store.modal
        const { target } = this.store.modal
        const { mode } = this.store.modal
        const title = `${mode} an user!`
        if(open) {
            return this.renderModal(target, mode, title)
        }
    }

    renderModal(target, mode, title){
        const store = new UserModalModel({
            target: Object.assign({}, target),
            mode,
            title
        })

        return (
            <UserModal
                onClose={()=>{
                    this.store.closeModal()
                    this.fetchUsers()
                }}
                store={store}
            />
        )
    }

    render () {

        const { users } = this.store

        return (
            <div>
                {this.displayModal()}
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            users.map((user) => {
                                return(
                                    <Table.Row key={user._id}>
                                        <Table.Cell>{user.name}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                floated='right'
                                                icon
                                                onClick={()=>{this.openModal('update', user)}}
                                            >
                                                <Icon name='write' /> Edit
                                            </Button>

                                            <Button
                                                floated='right'
                                                icon
                                                onClick={()=>{this.openModal('delete', user)}}
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
                            <Table.HeaderCell colSpan='3'>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    primary size='small'
                                    onClick={()=>{
                                        this.openModal('create', {name:''})
                                    }}
                                >
                                    <Icon name='add' /> Add User!
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}

export default UsersList