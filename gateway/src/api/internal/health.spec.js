
const ServerFactory = require('../../util/ServerFactory')
const Chairo = require('chairo')
const Code = require('code')
const Lab = require('lab')

const lab = exports.lab = Lab.script()
const before = lab.before
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const SUT = require('./health')
const plugins = [
    {
        register: Chairo
    },
    SUT,
]

let server

describe('GET /api/health', ()=>{

    before((done) => {
        ServerFactory.getServer(plugins)
            .then((newServer) => {
                server = newServer
                done()
            })
    })

    it('The health service responds', (done) => {

        const text = 'Everything fine in the main service!'

        const responseMessage = {
            response: text
        }

        const expectedMessage = {
            message: text
        }

        server.seneca.add({
            src: 'main',
            cmd: 'healthCheck',
        }, (message, callback) => {
            return callback(null, responseMessage)
        })

        server.inject({
            method: 'GET',
            url: '/api/health',
        }, (response) => {

            expect(response.statusCode).to.equal(200)
            expect(response.result).to.equal(expectedMessage)
            done()

        })

    });
})