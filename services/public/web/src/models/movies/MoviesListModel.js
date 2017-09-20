import { observable, computed, action } from 'mobx'
import MoviesService from '../../services/MoviesService'

export default class MoviesListModel {
    @observable movies = [];
    @observable modal = {
        open: false,
    }

    @action
    fetchMovies() {
        MoviesService.fetchMovies()
            .then((response) => {
                const movies = response.body
                this.movies = movies
            })
    }

    @action
    openModal(mode, target) {
        this.modal = {
            open: true,
            mode,
            target,
        }
    }

    @action
    closeModal() {
        this.modal = {
            open: false
        }
    }
}