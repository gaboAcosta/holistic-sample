
const homeCommands = {
    pause: function(time) {
        this.api.pause(time)
        return this
    },
    addNewThing(thingName) {
        return this
            .waitForElementVisible('@addThingButton', 200)
            .pause(1000)
            .click('@addThingButton')
            .waitForElementVisible('@thingModal', 200)
            .pause(1000)
            .setValue('@thingNameInput', thingName)
            .pause(1000)
            .click('@confirmThingButton')
            .pause(1000)
            .waitForElementVisible('@addThingButton', 200)
            .pause(1000)
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
        }
    }
};