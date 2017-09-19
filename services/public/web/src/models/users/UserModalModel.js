import { observable, computed, action } from 'mobx'
import UsersService from '../../services/UsersService'

export default class UserModalModel {
    @observable target = {
        name: '',
        email: '',
        password: '',
    };
    @observable open = true
    @observable mode = true

    title = ''

    get user() {
        return this.target
    }

    constructor({ target, mode, title }){
        this.target = target || {name:''}
        this.mode = mode
        this.title = title
    }

    addThing() {
        return UsersService.createUser(this.user)
            .then(() => {
                this.open = false
            })
    }


    updateThing() {
        return UsersService.updateUser(this.user)
            .then(() => {
                this.open = false
            })
    }

    deleteThing() {
        return UsersService.deleteUser(this.user)
            .then(() => {
                this.open = false
            })
    }

    getSubmitFunction (mode) {
        const functions = {
            'create': this.addThing.bind(this),
            'update': this.updateThing.bind(this),
            'delete': this.deleteThing.bind(this)
        }
        return functions[mode]
    }

    @action
    updateTarget ({name, email, password}) {
        name && (this.target.name = name)
        email && (this.target.email = email)
        password && (this.target.password = password)
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