const { connectAndRetry } = require('./dbConnect')
const { loadModels } = require('../util/dbLoadModels')

const seedActions = [
    function (db) {
        console.log('creating admin user')
        const user = {
            name: 'Admin',
            email: 'admin@example.com',
            password: 'myPassword!'
        }

        return db.Users.findOne({email: user.email}).exec().then((foundUser) => {
            console.log('finding admin user finished')
            if(!foundUser) {
                console.log('creating admin user')
                const newUser = new db.Users(user)
                return newUser.save()
            }

            console.log('admin user was already created')
            console.log(foundUser)
            return foundUser
        })
    },
]

connectAndRetry(console)
const db = loadModels()
const actionsPromises = []

seedActions.forEach((action) => {
    actionsPromises.push(action(db))
})
Promise.all(actionsPromises)
    .then(() => {
        console.log('All actions completed')
        process.exit(0)
    })
    .catch((ex) => {
        console.log('Some actions failed')
        console.log(ex)
        process.exit(1)
    })