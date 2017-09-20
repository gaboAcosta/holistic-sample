
const Code = require('code')
const Lab = require('lab')
const Chairo = require('chairo')

const ServerFactory = require('../../util/test/ServerFactory')
const DatabaseHelper = require('../../util/test/DatabaseHelper')
const SUT = require('./addMovie')
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

describe('Add Movie method', ()=>{

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

    it('adds a movie to the db', (done) => {

        const newMovie = {
            name: 'An awesome movie',
            score: 8.5
        }

        // Always add this so that seneca won't eat your errors!
        server.seneca.error(done)
        server.seneca.act({
            src: 'main',
            cmd: 'addMovie',
            movie: newMovie,
        }, (fatalErr, { error, movie }) => {

            expect(fatalErr).to.be.null()
            expect(error).to.be.undefined()
            const { _id } = movie

            server.db.Movies.findById(_id)
                .then((foundMovie) => {
                    expect(foundMovie.name).to.equal(newMovie.name)
                    expect(foundMovie.score).to.equal(newMovie.score)
                    done()
                })



        })

    });

    afterEach(() => {
        return DatabaseHelper.wipeCollections()
    })
})