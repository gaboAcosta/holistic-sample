
const dockerComposeUtil = require('../util/dockerCompose')
const argv = require('yargs').argv;

module.exports = (gulp) => {
    return gulp.task('docker-down', () => {
        return dockerComposeUtil.getEnvironment()
            .then(({ env }) => {
                const commands = ['down']
                return dockerComposeUtil.exec(commands, env)
            })
    });
}