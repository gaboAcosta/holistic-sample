
const homeCommands = {
    pause: function(time) {
        this.api.pause(time)
        return this
    },
    openThingsModal(){
        return this.click('@addThingButton')
            .waitForElementVisible('@thingModal', 200)
    },
    addNewThing(thingName) {
        return this .waitForElementVisible('@thingsList', 200)
                    .pause(1000)
                    .openThingsModal()
                    .pause(1000)
                    .setValue('@thingNameInput', thingName)
                    .pause(1000)
                    .click('@confirmThingButton')
                    .pause(1000)
                    .waitForElementVisible('@thingsList', 200)
                    .pause(1000)
    },
    expectNewThing(thing) {
        return this
            .waitForElementVisible('tr[data-thing-name="'+ thing+'"]', 200)
    }
};

module.exports = {
    url: 'http://web:8080',
    commands: [homeCommands],
    elements: {
        thingModal: {
            selector: '#thing-modal'
        },
        thingNameInput: {
            selector: '#thing-name'
        },
        confirmThingButton: {
            selector: '#confirm-thing-modal'
        },
        cancelThingButton: {
            selector: '#cancel-thing-modal'
        },
        addThingButton: {
            selector: '#add-thing'
        },
        thingsList: {
            selector: '#things-list'
        }
    }
};