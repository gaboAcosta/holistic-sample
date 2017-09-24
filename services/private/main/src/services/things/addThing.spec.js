
const Code = require('code')
const Lab = require('lab')
const Chairo = require('chairo')

const ServerFactory = require('../../util/test/ServerFactory')
const DatabaseHelper = require('../../util/test/DatabaseHelper')
const SUT = require('./addThing')
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

        // Always add this to handle any unexpected errors
        server.seneca.error((error) => {
            if(!error.isBoom) done(error)
        })
        server.seneca.act({
            src: 'main',
            cmd: 'addThing',
            name: newThing.name,
        }, (err, result) => {

            expect(err).to.be.null()

            const { thing } = result
            const { _id } = thing

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