const mongoose = require('mongoose')


class DatabaseHelper {

    static dropCollection(collection){
        return new Promise((resolve) => {
            collection.drop(() => {
                resolve()
            })
        })
    }

    static wipeCollections(){

        const { collections } = mongoose.connection
        const collectionNames = Object.keys(collections)
        const promises = collectionNames.map((collectionName) => {
            return DatabaseHelper.dropCollection(collections[collectionName])
        })

        return Promise.all(promises)

    }
}

module.exports = DatabaseHelper