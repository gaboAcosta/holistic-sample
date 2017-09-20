import { observable, computed, action } from 'mobx'
import MoviesService from '../../services/MoviesService'

export default class MoviesModalModel {
    @observable target = {
        name: '',
        score: null
    };
    @observable open = true
    @observable mode = true

    title = ''

    get movie() {
        return this.target
    }

    constructor({ target, mode, title }){
        this.target = target || {name:''}
        this.mode = mode
        this.title = title
    }

    addMovie() {
        return MoviesService.createMovie(this.movie)
            .then(() => {
                this.open = false
            })
    }


    updateMovie() {
        return MoviesService.updateMovie(this.movie)
            .then(() => {
                this.open = false
            })
    }

    deleteMovie() {
        return MoviesService.deleteMovie(this.movie)
            .then(() => {
                this.open = false
            })
    }

    getSubmitFunction (mode) {
        const functions = {
            'create': this.addMovie.bind(this),
            'update': this.updateMovie.bind(this),
            'delete': this.deleteMovie.bind(this)
        }
        return functions[mode]
    }

    @action
    updateTarget ({name, score}) {
        name && (this.target.name = name)
        score && (this.target.score = score)
    }

    @action submitTarget () {
        const { mode } = this
        const submitFUnction = this.getSubmitFunction(mode)
        return submitFUnction()
            .then(() => { this.closeModal() })
    }

    @action
    closeModal() {
        this.open = false
    }
}