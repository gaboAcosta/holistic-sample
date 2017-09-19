
const dockerComposeUtil = require('../util/dockerCompose')
const argv = require('yargs').argv;

module.exports = (gulp) => {
    return gulp.task('docker-logs', () => {
        return dockerComposeUtil.getEnvironment()
            .then(({ env }) => {
                const commands = ['logs','-f', '--tail=100']
                return dockerComposeUtil.exec(commands, env)
            })

    });
}