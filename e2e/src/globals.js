'use strict'

var wait = require('wait-on')
var opts = {
    resources: ['http://web:8080'],
    timeout: 10000
}

module.exports = {
  beforeEach: function (browser, done) {
    require('nightwatch-video-recorder').start(browser, function () {
      console.log('Waiting for', opts.resources[0])

        wait(opts, function(err){
          console.log('Done waiting')

          if(err){
            console.log('Wait failed')
          }

          done(err)

        })
    })
  },
  afterEach: function (browser, done) {
    require('nightwatch-video-recorder').stop(browser, done)
  }
}
