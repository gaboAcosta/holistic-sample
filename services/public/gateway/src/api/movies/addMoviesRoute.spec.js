
const ServerFactory = require('../../util/ServerFactory')
const Chairo = require('chairo')
const Code = require('code')
const Lab = require('lab')

const lab = exports.lab = Lab.script()
const before = lab.before
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const SUT = require('./addMoviesRoute')
const plugins = [
    {
        register: Chairo
    },
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

        server.seneca.add({
            src: 'main',
            cmd: 'addMovie',
            movie: { required$: true },
        }, ({ movie }, callback) => {

            expect(movie).to.be.object()

            return callback(null, Object.assign({}, expectedResult))
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

        server.seneca.add({
            src: 'main',
            cmd: 'addMovie',
            movie: { required$: true },
        }, ({ movie }, callback) => {

            expect(movie).to.be.object()

            return callback(null, Object.assign({}, expectedResult))
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

        server.seneca.add({
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
            done()
        })

    });

    it.only('It returns an error response if the service fails', (done) => {

        server.seneca.add({
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
            done()
        })

    });
})