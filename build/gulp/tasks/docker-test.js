
const inquirer = require('inquirer')
const dockerComposeUtil = require('../util/dockerCompose')
const chalk = require('chalk');
const argv = require('yargs').argv;

function askService(){
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Select a service to test',
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

function askEnvironment(){
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Select an environment to test',
            name: 'env',
            choices: [
                {
                    name: 'testDevelop'
                },
                {
                    name: 'testProduction'
                }
            ]
        }
    ])
}

function getService(){
    // sometimes it's convenient to pass env as an arg
    const { service } = argv
    return service ? Promise.resolve({ service }) : askService()
}

function getEnvironment(){
    // sometimes it's convenient to pass env as an arg
    const { env } = argv
    return env ? Promise.resolve({ env }) : askEnvironment()
}

module.exports = (gulp) => {
    return gulp.task('docker-test', (cb) => {
        return getService()
            .then(({service}) => {
                return getEnvironment()
                    .then(({ env }) => {
                        return { service, env }
                    })
            })
            .then(({ service, env }) => {

                const commands = ['run','--rm', service, 'test']

                dockerComposeUtil.exec(commands, env)

            })
            .catch((err)=>{
                console.log('SOMETHING WENT WRONG!!!')
                console.log(err)
                cb(err)
            })
    });
}