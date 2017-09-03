const nock = require('nock')

import ThingService from './ThingService'

const mockedThing = {
    _id: '59ac2745753203002a0feafc',
    name: 'What a beautiful thing!'
}

const mockedThings = [
    mockedThing,
    {
        _id: '59ac274d753203002a0feafd',
        name: 'This is a nice thing!'
    }
]


test('The fetchThings method calls the endpoint and returns an array on the response', () => {

    nock('http://localhost')
        .get('/api/things')
        .reply(200,mockedThings)

    ThingService.fetchThings()
        .then(response => {
            const things = response.body
            expect(things).toEqual(mockedThings);
        })
});

test('The createThing method calls POST /api/things with a name', () => {

    const newThing = { name: mockedThing.name }

    nock('http://localhost')
        .post('/api/things', newThing)
        .reply(200,mockedThing)

    ThingService.createThing(newThing)
        .then(response => {
            const thing = response.body
            expect(thing).toEqual(mockedThing);
        })
});
//
test('The deleteThing method calls DELETE /api/things/{id}', () => {

    const { _id } = mockedThing
    const path = `/api/things${_id}`
    const mockResponse = { ok: 1, n: 1 }

    nock('http://localhost')
        .delete(path)
        .reply(200,mockResponse)

    ThingService.deleteThing(mockedThing)
        .then(response => {
            const message = response.body
            expect(message).toEqual(mockResponse);
        })
});

test('The updateThing method calls PUT /api/things', () => {

    const updatedThing = Object.assign({}, mockedThing)
    const { _id } = mockedThing
    const path = `/api/things${_id}`
    updatedThing.name = 'My new name'

    nock('http://localhost')
        .put(path, updatedThing)
        .reply(200,Object.assign({}, updatedThing))

    ThingService.updateThing(updatedThing)
        .then(response => {
            const thing = response.body
            expect(thing).toEqual(updatedThing);
        })
});