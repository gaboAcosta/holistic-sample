
const dockerComposeUtil = require('../util/dockerCompose')
const argv = require('yargs').argv;

module.exports = (gulp) => {
    return gulp.task('docker-logs', (cb) => {
        const commands = ['logs','-f', '--tail=100']
        dockerComposeUtil.exec(commands, argv.env)
    });
}