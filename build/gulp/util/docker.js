
const spawn = require('child_process').spawn;
const path = require('path');
const gUtil = require('gulp-util');
const chalk = require('chalk');

const executeCommand = (commands=[]) => {

    const buildFolder = path.join(__dirname, '../../')

    const options = {
        cwd: buildFolder
    }

    const concatenatedArgs = commands.join(' ')
    gUtil.log('Executing command', chalk.magenta(`docker-compose ${concatenatedArgs}`));

    const process = spawn('docker', commands, options)

    process.on('error', (err) => {
        console.trace(err)
        gUtil.log('docker command failed:', chalk.red(err.toString()))
    })

    process.stdout.on('data', (data) => {
        console.log(data.toString())
    })

    process.stderr.on('data', (data) => {
        console.log(data.toString())
    })

    process.on('exit', function (code) {
        if(code === 0){
            gUtil.log('Docker command successful');
        } else {
            gUtil.log('child process exited with code ' + code.toString());
        }
    });
}

const exec = (commands=[]) => {
    return executeCommand(commands)
}

module.exports = {
    exec,
}