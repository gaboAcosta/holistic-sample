
const spawn = require('child_process').spawn;
const path = require('path');
const gUtil = require('gulp-util');
const chalk = require('chalk');
const argv = require('yargs').argv;
const inquirer = require('inquirer')
const _ = require('lodash')

const executeCommand = (commands=[], dockerFiles=[]) => {

    return new Promise((resolve, reject) => {
        const buildFolder = path.join(__dirname, '../../')

        const options = {
            cwd: buildFolder
        }

        const fileCommands = []

        dockerFiles.forEach((file) => {
            fileCommands.push('-f')
            fileCommands.push(file)
        })

        const composeArgs = fileCommands.concat(commands)
        const concatenatedArgs = composeArgs.join(' ')
        gUtil.log('Executing command', chalk.magenta(`docker-compose ${concatenatedArgs}`));

        const process = spawn('docker-compose', composeArgs, options)

        process.on('error', (err) => {
            console.trace(err)
            reject(err)
            gUtil.log('docker-compose failed:', chalk.red(err.toString()))
        })

        process.stdout.on('data', (data) => {
            console.log(data.toString())
        })

        process.stderr.on('data', (data) => {
            console.log(data.toString())
        })

        process.on('exit', function (code) {
            if(code === 0) resolve()
            gUtil.log('child process exited with code ' + code.toString());
        });
    })


}

const baseCompose = 'docker-compose.base.yaml'
const productionCompose = 'docker-compose.production.yaml'
const devCompose = 'docker-compose.local.yaml'
const testCompose = 'docker-compose.test.yaml'

const filesDictionary = {
    develop: [
        baseCompose,
        devCompose,
    ],
    testDevelop: [
        baseCompose,
        devCompose,
        testCompose,
    ],
    testProduction: [
        baseCompose,
        productionCompose,
        testCompose,
    ],
    production: [
        baseCompose,
        productionCompose
    ]
}

const getFilesForEnv = (env) => {
    return filesDictionary[env]
}

function askEnvironment(){
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Select an environment to use',
            name: 'env',
            choices: [
                {
                    name: 'develop'
                },
                {
                    name: 'testDevelop'
                },
                {
                    name: 'production'
                },
                {
                    name: 'testProduction'
                },
            ]
        }
    ])
}

function getEnvironment(){

    let env

    if(_.isString(argv.e) || _.isString(argv.env)) {
        env = argv.e || argv.env
        return Promise.resolve({ env })
    }

    if(argv.e === undefined && argv.env === undefined){
        env = 'develop'
        return Promise.resolve({ env })
    }

    return askEnvironment()

}

const exec = (commands=[], env) => {
    return executeCommand(commands, getFilesForEnv(env))
}

module.exports = {
    exec,
    getEnvironment,
}