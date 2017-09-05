
const dockerComposeUtil = require('../util/dockerCompose')
const argv = require('yargs').argv;

module.exports = (gulp) => {
    return gulp.task('docker-up', (cb) => {
        const commands = ['up']
        argv.build && commands.push('--build')
        dockerComposeUtil.exec(commands, argv.env)
    });
}