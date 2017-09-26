
const Code = require('code')
const Lab = require('lab')
const Chairo = require('chairo')

const lab = exports.lab = Lab.script()
const before = lab.before
const beforeEach = lab.beforeEach
const afterEach = lab.afterEach
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const ServerFactory = require('../../util/test/ServerFactory')
const DatabaseHelper = require('../../util/test/DatabaseHelper')

const SUT = require('./deleteMovie')
const db = require('../../setup/db')

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

describe('Delete Movie method', ()=>{

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

        const newMovie = {
            name: 'An awesome movie',
            score: 0
        }

        // Always add this to handle any unexpected errors
        server.seneca.error((error) => {
            if(!error.isBoom) done(error)
        })

        server.db.Movies.create(newMovie, (err, {_id}) => {
            server.seneca.act({
                src: 'main',
                service: 'deleteMovie',
                id: _id,
            }, (err, result) => {

                expect(err).to.be.null()
                server
                    .db
                    .Movies
                    .findById(_id)
                    .then((foundMovie) => {
                        expect(foundMovie).to.be.null()
                        done()
                    })

            })
        })



    });

    afterEach(() => {
        return DatabaseHelper.wipeCollections()
    })
})