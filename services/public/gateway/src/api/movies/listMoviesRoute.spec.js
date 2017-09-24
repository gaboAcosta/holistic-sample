
const ServerFactory = require('../../util/ServerFactory')
const senecaSetup = require('../../util/senecaSetupTest')
const senecaConstructor = require('seneca')
const Code = require('code')
const Lab = require('lab')
const Boom = require('boom')

const lab = exports.lab = Lab.script()
const before = lab.before
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const SUT = require('./listMoviesRoute')
const plugins = [
    senecaSetup,
    SUT,
]

const mockMovies = [
    {
        _id: '59c2515c2fa8810029299dc5',
        name: 'An awesome movie',
        score: 9.5
    },
    {
        _id: '59c2515c2fa8810029299dc6',
        name: 'An not so awesome movie'
    }
]


let server

describe('GET /api/movies', ()=>{

    before((done) => {
        ServerFactory.getServer(plugins)
            .then((newServer) => {
                server = newServer
                done()
            })
    })

    it('It returns all the movies on the database', (done) => {

        const client = senecaConstructor()
        server.seneca.setClient(client)

        client.add({
            src: 'main',
            cmd: 'listMovies',
        }, (message, callback) => {

            return callback(null, { movies: mockMovies})
        })

        server.inject({
            method: 'GET',
            url: '/api/movies'
        }, ({ statusCode, result }) => {
            expect(statusCode).to.equal(200)
            expect(result).to.equal(mockMovies)
            done()
        })

    });

    it('It returns an error response if the service returns an error', (done) => {

        const client = senecaConstructor()
        server.seneca.setClient(client)

        const errorMessage = 'Some internal error'

        client.add({
            src: 'main',
            cmd: 'listMovies',
        }, (message, callback) => {

            return callback(Boom.internal(errorMessage))
        })

        server.inject({
            method: 'GET',
            url: '/api/movies',
        }, ({ statusCode, result }) => {

            expect(result).to.equal(`seneca: Action cmd:listMovies,src:main failed: ${errorMessage}.`)
            expect(statusCode).to.equal(500)
            console.log('===== ERROR CORRECTLY HANDLED =====')
            done()
        })

    });

    it('It returns an error response if the service fails', (done) => {

        const client = senecaConstructor()
        server.seneca.setClient(client)

        const errorMessage = 'Woooww!!'

        client.add({
            src: 'main',
            cmd: 'listMovies',
        }, (message, callback) => {

            throw new Error(errorMessage)
        })

        server.inject({
            method: 'GET',
            url: '/api/movies',
        }, ({ statusCode, result }) => {

            console.log('===== ERROR CORRECTLY HANDLED =====')
            console.log(result)
            const expected = `seneca: Action cmd:listMovies,src:main failed: ${errorMessage}.`
            expect(result).to.equal(expected)
            expect(statusCode).to.equal(500)

            done()
        })

    });
})