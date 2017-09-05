
const dockerComposeUtil = require('../util/dockerCompose')
const argv = require('yargs').argv;

module.exports = (gulp) => {
    return gulp.task('docker-down', (cb) => {
        const commands = ['down']
        dockerComposeUtil.exec(commands, argv.env)
    });
}