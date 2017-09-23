
const ServerFactory = require('../../util/ServerFactory')
const senecaSetup = require('../../util/senecaSetupTest')
const senecaConstructor = require('seneca')
const Code = require('code')
const Lab = require('lab')

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

        client.add({
            src: 'main',
            cmd: 'listMovies',
        }, (message, callback) => {

            const error = { message: 'Some internal error'}

            return callback(null, { error })
        })

        server.inject({
            method: 'GET',
            url: '/api/movies',
        }, ({ statusCode, result }) => {

            const { error } = result
            const { message } = result

            expect(error).to.equal('Internal Server Error')
            expect(message).to.equal('An internal server error occurred')
            expect(statusCode).to.equal(500)
            console.log('===== ERROR CORRECTLY HANDLED =====')
            done()
        })

    });

    it('It returns an error response if the service fails', (done) => {

        const client = senecaConstructor()
        server.seneca.setClient(client)
        client.add({
            src: 'main',
            cmd: 'listMovies',
        }, (message, callback) => {

            throw new Error('Woooww!!')
        })

        server.inject({
            method: 'GET',
            url: '/api/movies',
        }, ({ statusCode, result }) => {

            const { error } = result
            const { message } = result

            expect(error).to.equal('Internal Server Error')
            expect(message).to.equal('An internal server error occurred')
            expect(statusCode).to.equal(500)
            console.log('===== ERROR CORRECTLY HANDLED =====')
            done()
        })

    });
})