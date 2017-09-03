
const ServerFactory = require('../../util/test/ServerFactory')
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
        register: Chairo,
        options: {
            log: 'info+,type:act',
        },
    },
    SUT,
]

let server

describe('Internal services tests', ()=>{

    before((done) => {
        ServerFactory.getServer(plugins)
            .then((newServer) => {
                server = newServer
                done()
            })
    })

    it('The health service responds', (done) => {

        server.seneca.act({
            src: 'main',
            cmd: 'healthCheck',
        }, (err, result) => {

            expect(err).to.be.null()
            expect(result).to.be.equal({ response: 'Everything fine in the main service!' })
            done()

        })

    });
})