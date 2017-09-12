
const inquirer = require('inquirer')
const dockerUtil = require('../util/docker')

module.exports = (gulp) => {
    return gulp.task('docker-init', (cb) => {
        const initCommands = [
            'volume',
            'create',
            '--name=holistic_mongo'
        ]
        dockerUtil.exec(initCommands)
    });
}