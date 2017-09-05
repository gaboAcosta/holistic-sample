'use strict'

module.exports = {
  'nightwatch test': function (browser) {
      //
      // this.getLog('browser', function(logEntriesArray) {
      //     console.log('Log length: ' + logEntriesArray.length);
      //     logEntriesArray.forEach(function(log) {
      //         console.log('[' + log.level + '] ' + log.timestamp + ' : ' + log.message);
      //     });
      // });

        browser
            .url(browser.launch_url)
            .getLog('browser', function() {
                console.log('=== ERRORS INCOMMING ===')
                console.log(arguments);
                console.log('=== ERRORS INCOMMING ===')
            })
        browser
            .pause(1000)
            .setValue('#input', 'nightwatch')
            .expect.element('#result').text.to.equal('nightwatch')
        browser
            .pause(1000)
            .clearValue('#input')
            .setValue('#input', 'test')
            .expect.element('#result').text.to.equal('test')
        browser
            .pause(1000)
            .end()
  }
}
