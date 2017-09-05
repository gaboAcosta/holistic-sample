
const inquirer = require('inquirer')
const dockerComposeUtil = require('../util/dockerCompose')
const gUtil = require('gulp-util');
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
    return gulp.task('docker-build', (cb) => {
        return askService()
            .then(({service}) => {
                const commands = ['build']
                service && service !== 'all' && commands.push(service)
                dockerComposeUtil.exec(commands, argv.env)
            })
            .catch((err)=>{
                console.log('SOMETHING WENT WRONG!!!')
                console.log(err)
                cb(err)
            })
    });
}