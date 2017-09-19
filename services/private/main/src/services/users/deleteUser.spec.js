
const Code = require('code')
const Lab = require('lab')
const Chairo = require('chairo')

const ServerFactory = require('../../util/test/ServerFactory')
const DatabaseHelper = require('../../util/test/DatabaseHelper')
const SUT = require('./deleteUser')
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

describe('Delete User method', ()=>{

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

    it('deletes an user from the db', (done) => {

        const newUser = {
            name: 'An awesome user',
            email: 'test@example.com',
            password: 'a very secret password'
        }

        server.db.Users.create(newUser, (err, {_id}) => {
            server.seneca.act({
                src: 'main',
                service: 'user',
                cmd: 'delete',
                id: _id,
            }, (err, result) => {

                expect(err).to.be.null()
                server
                    .db
                    .Users
                    .findById(_id)
                    .then((foundUser) => {
                        expect(foundUser).to.be.null()
                        done()
                    })

            })
        })



    });

    afterEach(() => {
        return DatabaseHelper.wipeCollections()
    })
})