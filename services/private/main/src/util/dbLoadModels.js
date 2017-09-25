const Glob = require('glob')

function loadModels(){
    const db = {}

    Glob.sync('../db/schemas/**/*.js', {
        realpath: true,
        cwd: __dirname,
    })
    .forEach((file) => {
        const model = require(file)
        const modelName = model.modelName
        db[modelName] = model
    })
    return db
}

module.exports = {
    loadModels,
}