
const Code = require('code')
const Lab = require('lab')
const Chairo = require('chairo')

const ServerFactory = require('../../util/test/ServerFactory')
const DatabaseHelper = require('../../util/test/DatabaseHelper')
const SUT = require('./getUser')
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
            log: 'info+,type:act',
        },
    },
    db,
    SUT,
]

let server

describe('Get User method', ()=>{

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

    it('gets an user from the db', (done) => {

        const newUser = {
            name: 'An awesome user',
            email: 'test@example.com',
            password: 'a very secret password'
        }

        const user = server.db.Users.create(newUser)
        user.save()
            .then(({_id}) => {
                server.seneca.act({
                    src: 'main',
                    service: 'user',
                    cmd: 'get',
                    id: _id,
                }, (err, result) => {

                    const foundUser = result
                    expect(foundUser.name).to.be.null()
                    expect(foundUser.email).to.be.null()
                    expect(foundUser.password).to.be.null()
                    done()

                })
            })

    });

    afterEach(() => {
        return DatabaseHelper.wipeCollections()
    })
})