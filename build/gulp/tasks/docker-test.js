
const inquirer = require('inquirer')
const dockerComposeUtil = require('../util/dockerCompose')
const chalk = require('chalk');
const argv = require('yargs').argv;

function askService(){
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Select a service to tast',
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

function getService(){
    // sometimes it's convenient to pass env as an arg
    const { service } = argv
    return service ? Promise.resolve({ service }) : askService()
}

module.exports = (gulp) => {
    return gulp.task('docker-test', (cb) => {
        return getService()
            .then(({service}) => {
                const commands = ['run','--rm', service, 'test']

                dockerComposeUtil.exec(commands, argv.env)
            })
            .then((result) => {



            })
            .catch((err)=>{
                console.log('SOMETHING WENT WRONG!!!')
                console.log(err)
                cb(err)
            })
    });
}