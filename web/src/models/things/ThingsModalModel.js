import { observable, computed, action } from 'mobx'
import ThingService from '../../services/ThingService'

export default class ThingsModalModel {
    @observable target = {
        name: ''
    };
    @observable open = true
    @observable mode = true

    title = ''

    get thing() {
        return this.target
    }

    constructor({ target, mode, title }){
        this.target = target || {name:''}
        this.mode = mode
        this.title = title
    }

    addThing() {
        return ThingService.createThing(this.thing)
            .then(() => {
                this.open = false
            })
    }


    updateThing() {
        return ThingService.updateThing(this.thing)
            .then(() => {
                this.open = false
            })
    }

    deleteThing() {
        return ThingService.deleteThing(this.thing)
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
    updateTarget (name) {
        this.target.name = name
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