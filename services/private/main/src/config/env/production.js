
module.exports = {
    mongo:{
        host: process.env.MONGO_HOST,
        db: 'holistic',
        options: {
            useMongoClient: true,
        }
    }
}