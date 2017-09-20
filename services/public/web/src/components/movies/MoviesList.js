import React, { Component } from 'react'
import { Icon, Table, Button } from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'

import MoviesModal from './MoviesModal'
import MoviesModalModel from '../../models/movies/MoviesModalModel'

@inject('MoviesListModel') @observer
class MoviesList extends Component {

    constructor (props) {
        super(props)
        this.store = new this.props.MoviesListModel()
    }

    componentDidMount () {
        this.fetchMovies()
    }

    fetchMovies () {
        this.store.fetchMovies()
    }

    openModal (mode, target) {
        this.store.openModal(mode, target)
    }

    displayModal () {
        const { open } = this.store.modal
        const { target } = this.store.modal
        const { mode } = this.store.modal
        const title = `${mode} a movie!`
        if(open) {
            return this.renderModal(target, mode, title)
        }
    }

    renderModal(target, mode, title){
        const store = new MoviesModalModel({
            target: Object.assign({}, target),
            mode,
            title
        })

        return (
            <MoviesModal
                onClose={()=>{
                    this.store.closeModal()
                    this.fetchMovies()
                }}
                store={store}
            />
        )
    }

    render () {

        const { movies } = this.store

        return (
            <div>
                {this.displayModal()}
                <Table celled id="movies-list">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            movies.map((movie) => {
                                return(
                                    <Table.Row
                                        data-movie-name={movie.name}
                                        key={movie._id}
                                    >
                                        <Table.Cell>{movie.name}</Table.Cell>
                                        <Table.Cell>{movie.score}</Table.Cell>
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
                                    id="add-movie"
                                    icon
                                    labelPosition='left'
                                    primary size='small'
                                    onClick={()=>{
                                        this.openModal('create', {name:''})
                                    }}
                                >
                                    <Icon name='add' id="create-movie"/> Add Movie
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}

export default MoviesList