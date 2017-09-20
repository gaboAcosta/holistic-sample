
const Code = require('code')
const Lab = require('lab')
const Chairo = require('chairo')

const ServerFactory = require('../../util/test/ServerFactory')
const DatabaseHelper = require('../../util/test/DatabaseHelper')
const SUT = require('./addUser')
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
        register: Chairo
    },
    db,
    SUT,
]

let server

describe('Add User method', ()=>{

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

    it('adds a user to the db', (done) => {

        const newUser = {
            name: 'An awesome user',
            email: 'test@example.com',
            password: 'a very secret password'
        }
        server.seneca.act({
            src: 'main',
            service: 'user',
            cmd: 'add',
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        }, (fatal, {error, user}) => {

            expect(fatal).to.be.null()
            expect(error).to.be.undefined()
            const { _id } = user

            server.db.Users.findById(_id)
                .then((foundUser) => {
                    expect(foundUser.name).to.equal(newUser.name)
                    expect(foundUser.email).to.equal(newUser.email)
                    done()
                })
        })

    });

    afterEach(() => {
        return DatabaseHelper.wipeCollections()
    })
})