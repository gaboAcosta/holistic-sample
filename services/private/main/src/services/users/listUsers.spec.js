
const Code = require('code')
const Lab = require('lab')
const Chairo = require('chairo')
const _ = require('lodash')

const ServerFactory = require('../../util/test/ServerFactory')
const DatabaseHelper = require('../../util/test/DatabaseHelper')
const SUT = require('./listUsers')
const db = require('../../setup/db')

const lab = exports.lab = Lab.script()
const before = lab.before
const beforeEach = lab.beforeEach
const afterEach = lab.afterEach
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const plugins = [
    {
        register: Chairo,
        options: {
            log: 'silent',
            fixedargs: {fatal$:false}
        },
    },
    db,
    SUT,
]

let server

const mockUsers = [
    {
        name: 'An awesome user',
        email: 'test@example.com',
        password: 'a very secret password'
    },
    {
        name: 'Another awesome user',
        email: 'another@example.com',
        password: 'another very secret password'
    }
]

describe('List Users method', ()=>{

    before((done) => {
        ServerFactory.getServer(plugins)
            .then((newServer) => {
                server = newServer
                done()
            })
    })

    beforeEach(() => {
        return DatabaseHelper.wipeCollections()
    })

    it('lists the users from the db', (done) => {

        // Always add this to handle any unexpected errors
        server.seneca.error((error) => {
            if(!error.isBoom) done(error)
        })


        server.db.Users.create(mockUsers, (err, users) => {

            expect(err).to.be.null()

            server.seneca.act({
                src: 'main',
                service: 'user',
                cmd: 'list'
            }, (err, result) => {

                const { users } = result

                users.map((user) => {
                    const originalUser = _.first(mockUsers.filter(u=>u.email === user.email))
                    expect(originalUser).to.be.an.object();
                    expect(originalUser.name).to.be.equal(user.name)
                    expect(originalUser.email).to.be.equal(user.email)
                })

                done()
            })
        })

    });

    afterEach(() => {
        return DatabaseHelper.wipeCollections()
    })
})