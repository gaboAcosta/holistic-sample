
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
    return gulp.task('docker-command', (cb) => {
        return askService()
            .then(({service}) => {
                return askCommand()
                    .then(({command}) => { return {service, command} })
            })
            .then((result) => {

                const { service } = result
                const { command } = result

                const dockerCommands = command.split(' ')

                const commands = ['run' , service].concat(dockerCommands)

                dockerComposeUtil.exec(commands, argv.env)

            })
            .catch((err)=>{
                console.log('SOMETHING WENT WRONG!!!')
                console.log(err)
                cb(err)
            })
    });
}