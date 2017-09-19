import { observable, computed, action } from 'mobx'
import ThingService from '../../services/ThingService'

export default class ThingsListModel {
    @observable things = [];
    @observable modal = {
        open: false,
    }

    @action
    fetchThings() {
        ThingService.fetchThings()
            .then((response) => {
                const things = response.body
                this.things = things
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