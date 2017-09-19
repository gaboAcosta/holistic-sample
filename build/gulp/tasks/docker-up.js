
const dockerComposeUtil = require('../util/dockerCompose')
const argv = require('yargs').argv;

module.exports = (gulp) => {
    return gulp.task('docker-up', () => {
        return dockerComposeUtil.getEnvironment()
            .then(({ env }) => {
                const commands = ['up']
                argv.build && commands.push('--build')
                argv.detached && commands.push('-d')
                return dockerComposeUtil.exec(commands, env)
            })
    });
}