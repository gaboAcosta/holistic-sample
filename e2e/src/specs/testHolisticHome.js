
const randomString = require('randomstring')

module.exports = {
    before(browser){
        browser.getLog( 'browser', function ( message ) {
            if(message.length > 0){
                console.log('=== Received log!! ===')
                console.trace(message)
            }
        });
    },
    'Adding Things': function(browser) {
        const homePage = browser.page.homePage();
        const random = randomString.generate(5);
        const thing = `Holistic Thing ${random}`;

        homePage
            .navigate()
            .pause(300)
            .addNewThing(thing)
            .expectNewThing(thing);

        browser.end();
    },
    'Canceling modal': function (browser) {
        const homePage = browser.page.homePage();

        homePage
            .navigate()
            .pause(300)
            .openThingsModal()
            .pause(300)
            .click('@cancelThingButton')
            .waitForElementNotPresent('@thingModal', 200)

    }
};