
const inquirer = require('inquirer')
const dockerComposeUtil = require('../util/dockerCompose')
const chalk = require('chalk');
const argv = require('yargs').argv;

function askService(){
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Select a service to build',
            name: 'service',
            choices: [
                {
                    name: 'all'
                },
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

module.exports = (gulp) => {
    return gulp.task('docker-build', () => {
        return askService()
            .then(({service}) => {
                 return dockerComposeUtil.getEnvironment()
                     .then(({ env }) => {
                         const commands = ['build','--no-cache']
                         service && service !== 'all' && commands.push(service)
                         return dockerComposeUtil.exec(commands, env)
                     })
            })
    });
}