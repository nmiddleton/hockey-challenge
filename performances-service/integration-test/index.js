/* eslint-env mocha */
const supertest = require('supertest')

describe('fixtures-service', () => {
  const api = supertest('http://localhost:3000')
  it('returns a 200 for a known fixtures', (done) => {
    api.get('/fixtures')
      .expect(200, done)
  })
})
