import { observable, computed, action } from 'mobx'
import history from '../history'

class SessionModel {

    @observable user = {}
    @observable token = ''

    constructor(){
        this.token = localStorage.getItem('token') || ''
        try{
            this.user = JSON.parse(localStorage.getItem('user'))
        } catch(ex){
            this.user = {}
        }
    }

    @action
    setUser(user) {
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
    }

    @action
    setToken(token) {
        this.token = token
        localStorage.setItem('token', token)
    }

    @action
    logout(){
        this.user = {}
        this.token = ''
        localStorage.removeItem('token')
        history.push('/login')
    }
}

// Just in this case, we do want to carry state around
export default new SessionModel()