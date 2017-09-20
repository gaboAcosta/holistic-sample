
const Code = require('code')
const Lab = require('lab')
const Chairo = require('chairo')
const _ = require('lodash')

const ServerFactory = require('../../util/test/ServerFactory')
const DatabaseHelper = require('../../util/test/DatabaseHelper')
const SUT = require('./listMovies')
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

const mockMovies = [
    {
        name: 'An awesome movie',
        score: 9.5
    },
    {
        name: 'An not so awesome movie'
    }
]

describe('List Movies method', ()=>{

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

    it('lists the movies from the db', (done) => {



        server.db.Movies.create(mockMovies, (err, movies) => {

            expect(err).to.be.null()

            // Always add this so that seneca won't eat your errors!
            server.seneca.error(done)
            server.seneca.act({
                src: 'main',
                cmd: 'listMovies'
            }, (fatal, { error, movies }) => {

                expect(fatal).to.be.null()
                expect(error).to.be.undefined()

                movies.map((movie) => {
                    const originalMovie = _.first(mockMovies.filter(m=>m.name === movie.name))
                    expect(originalMovie).to.be.an.object();
                    expect(originalMovie.name).to.be.equal(movie.name)
                    expect(originalMovie.score).to.be.equal(movie.score)
                })

                done()
            })

        }).catch(done)

    });

    afterEach(() => {
        return DatabaseHelper.wipeCollections()
    })
})