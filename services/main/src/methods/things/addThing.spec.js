
const Code = require('code')
const Lab = require('lab')
const Chairo = require('chairo')

const ServerFactory = require('../../util/test/ServerFactory')
const DatabaseHelper = require('../../util/test/DatabaseHelper')
const SUT = require('./addThings')
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

describe('Add Things method', ()=>{

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

    it('adds a thing to the db', (done) => {

        const newThing = {
            name: 'An awesome thing'
        }
        server.seneca.act({
            src: 'main',
            cmd: 'addThings',
            name: newThing.name,
        }, (err, result) => {

            expect(err).to.be.null()
            const { _id } = result

            server.db.Things.findById(_id)
                .then((foundThing) => {
                    expect(foundThing.name).to.equal(newThing.name)
                    done()
                })



        })

    });

    afterEach(() => {
        return DatabaseHelper.wipeCollections()
    })
})