
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

const SUT = require('./addMoviesRoute')
const plugins = [
    senecaSetup,
    SUT,
]

const _id = '59c2515c2fa8810029299dc5'
const name = 'Star Wars'
const score = 100

let server

describe('POST /api/movies', ()=>{

    before((done) => {
        ServerFactory.getServer(plugins)
            .then((newServer) => {
                server = newServer
                done()
            })
    })

    it('It adds a movie when all values are sent', (done) => {

        const expectedResult = {
            _id,
            name,
            score,
        }

        const client = senecaConstructor()
        server.seneca.setClient(client)

        client.add({
            src: 'main',
            cmd: 'addMovie',
            movie: { required$: true },
        }, ({ movie }, callback) => {

            expect(movie).to.be.object()

            const newMovie =  Object.assign({}, expectedResult)
            return callback(null, { movie: newMovie })
        })

        server.inject({
            method: 'POST',
            url: '/api/movies',
            payload: {
                name,
                score,
            },
        }, ({ statusCode, result }) => {
            expect(statusCode).to.equal(200)
            expect(result).to.equal(expectedResult)
            done()
        })

    });

    it('It adds a movie when only a name is sent', (done) => {

        const expectedResult = {
            _id,
            name,
        }

        const client = senecaConstructor()
        server.seneca.setClient(client)

        client.add({
            src: 'main',
            cmd: 'addMovie',
            movie: { required$: true },
        }, ({ movie }, callback) => {

            expect(movie).to.be.object()

            const newMovie =  Object.assign({}, expectedResult)
            return callback(null, { movie: newMovie })
        })

        server.inject({
            method: 'POST',
            url: '/api/movies',
            payload: {
                name,
            },
        }, ({ statusCode, result }) => {
            expect(statusCode).to.equal(200)
            expect(result).to.equal(expectedResult)
            done()
        })

    });

    it('It returns an error response if the service returns an error', (done) => {

        const client = senecaConstructor()
        server.seneca.setClient(client)

        client.add({
            src: 'main',
            cmd: 'addMovie',
            movie: { required$: true },
        }, ({ movie }, callback) => {

            expect(movie).to.be.object()
            const error = { message: 'Some internal error'}

            return callback(null, { error })
        })

        server.inject({
            method: 'POST',
            url: '/api/movies',
            payload: {
                name,
            },
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
            cmd: 'addMovie',
            movie: { required$: true },
        }, (message, callback) => {

            throw new Error('Woooww!!')
        })

        server.inject({
            method: 'POST',
            url: '/api/movies',
            payload: {
                name,
            },
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

    it('It returns an error response if the service is not working', (done) => {

        server.inject({
            method: 'POST',
            url: '/api/movies',
            payload: {
                name,
            },
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