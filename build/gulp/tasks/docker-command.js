
const inquirer = require('inquirer')
const dockerComposeUtil = require('../util/dockerCompose')
const gUtil = require('gulp-util');
const chalk = require('chalk');
const argv = require('yargs').argv;

function askService(){
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Select a service',
            name: 'service',
            choices: [
                {
                    name: 'gateway'
                },
                {
                    name: 'main'
                },
                {
                    name: 'web'
                },
                {
                    name: 'nightwatch'
                },
            ]
        }
    ])
}

function askCommand(){
    return inquirer.prompt([
        {
            type: 'input',
            message: 'please enter a command',
            name: 'command',
            validate: function (answer) {
                if (answer.length < 1) {
                    return 'Please enter a valid command';
                }
                return true;
            }
        }
    ])
}

module.exports = (gulp) => {
    return gulp.task('docker-command', () => {
        return askService()
            .then(({service}) => {
                return dockerComposeUtil.getEnvironment()
                    .then(({ env }) => { return { service, env } })
            })
            .then(({service, env}) => {
                return askCommand()
                    .then(({command}) => { return {service, env, command} })
            })
            .then(({service, env, command}) => {
                const dockerCommands = command.split(' ')
                const commands = ['run' , service].concat(dockerCommands)
                return dockerComposeUtil.exec(commands, env)
            })
    });
}