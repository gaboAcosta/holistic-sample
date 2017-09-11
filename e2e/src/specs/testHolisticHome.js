module.exports = {
    'Home Page': function(client) {
        const homePage = client.page.homePage();
        client.getLog( 'browser', function ( message ) {
            console.log('=== Received log!! ===')
            console.trace(message)
        });
        homePage
            .navigate()

        client.pause(300)

        homePage.addNewThing('Gabo Acosta');

        client.end();
    }
};