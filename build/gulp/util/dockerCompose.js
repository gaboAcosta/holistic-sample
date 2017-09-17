
const spawn = require('child_process').spawn;
const path = require('path');
const gUtil = require('gulp-util');
const chalk = require('chalk');

const executeCommand = (commands=[], dockerFiles=[]) => {

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
        gUtil.log('docker-compose failed:', chalk.red(err.toString()))
    })

    process.stdout.on('data', (data) => {
        console.log(data.toString())
    })

    process.stderr.on('data', (data) => {
        console.log(data.toString())
    })

    process.on('exit', function (code) {
        gUtil.log('child process exited with code ' + code.toString());
    });
}

const mainCompose = 'docker-compose.yaml'
const devCompose = 'docker-compose.local.yaml'
const testCompose = 'docker-compose.test.yaml'

const filesDictionary = {
    develop: [
        mainCompose,
        devCompose,
    ],
    test: [
        mainCompose,
        testCompose,
    ]
}

const getFilesForEnv = (env='develop') => {
    return filesDictionary[env]
}

const exec = (commands=[], env) => {
    return executeCommand(commands, getFilesForEnv(env))
}

module.exports = {
    exec,
}