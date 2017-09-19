import { observable, computed, action } from 'mobx'
import UsersService from '../../services/UsersService'

export default class UsersListModel {
    @observable users = [];
    @observable modal = {
        open: false,
    }

    @action
    fetchUsers() {
        UsersService.fetchUsers()
            .then((response) => {
                const users = response.body
                this.users = users
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