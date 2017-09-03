import React, { Component } from 'react'
import { Icon, Table, Button, Modal } from 'semantic-ui-react'
import ThingsModal from './ThingsModal'
import ThingService from '../../services/ThingService'

export default class ThingsList extends Component {

    constructor (props) {
        super(props)
        this.state = {
            things:[],
            modal: {
                open: false,
            }
        }
    }

    componentDidMount () {
        this.fetchThings()
    }

    createThing (thing) {
        ThingService.createThing(thing)
        .then(() => {
            this.setState({
                modal: {
                    open: false
                }
            })
            return this.fetchThings()
        })
    }

    updateThing (thing) {
        ThingService.updateThing(thing)
        .then(() => {
            this.setState({
                modal: {
                    open: false
                }
            })
            return this.fetchThings()
        })
    }

    deleteThing (thing) {
        ThingService.deleteThing(thing)
        .then(() => {
            this.setState({
                modal: {
                    open: false
                }
            })
            return this.fetchThings()
        })
    }

    fetchThings () {
        ThingService.fetchThings()
        .then((response) => {
            const things = response.body
            this.setState({
                things,
            })
        })
    }

    openModal (mode, target) {
        this.setState({
            modal: {
                open: true,
                mode,
                target,
            }
        })
    }

    displayModal () {
        const { open } = this.state.modal
        const { target } = this.state.modal
        const { mode } = this.state.modal
        const title = `${mode} a thing!`
        const onCancel = () => { this.setState({modal:{open:false}}) }
        if(open) {
            return (
                <ThingsModal
                    onComplete={(thing)=>{
                        switch(mode){
                            case 'create':
                                this.createThing(thing)
                                break;
                            case 'update':
                                this.updateThing(thing)
                                break;
                            case 'delete':
                                this.deleteThing(thing)
                                break;

                        }
                    }}
                    onCancel={onCancel}
                    target={target}
                    mode={mode}
                    title={title}
                />
            )
        }
    }

    render () {

        const { things } = this.state

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
                                    <Icon name='add' /> Add Thing
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}