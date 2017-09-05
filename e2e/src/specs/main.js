'use strict'

module.exports = {
  'The main app is render': function (browser) {
        browser
            .url(browser.launch_url)
            .waitForElementVisible('body', 1000)
        browser
            .pause(1000)
            .waitForElementVisible('body', 3000)
  }
}
