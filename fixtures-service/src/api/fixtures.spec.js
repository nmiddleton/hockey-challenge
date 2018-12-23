/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')

describe('Fixtures API', () => {
  let app = null
  let test_fixtures = [{
    away_team: 'Basildon 1',
    division: '3se',
    fixture_date: '22-Sep-18',
    gender: 'M',
    home_team: 'Maldon 2',
    _id: '22-Sep-18:Basildon 1'
  }, {
    away_team: 'Chelmsford 2',
    division: '3se',
    fixture_date: '29-Sep-18',
    gender: 'M',
    home_team: 'Old Loughts Academy',
    _id: '29-Sep-18:Old Loughts Academy',
  }, {
    away_team: 'Maldon 2',
    division: '4se',
    fixture_date: '08-Dec-18',
    gender: 'F',
    home_team: 'Basildon 1',
    _id: '08-Dec-18:Basildon 1'
  }, {
    away_team: 'Old Loughts Academy',
    division: '4se',
    fixture_date: '12-Jan-19',
    gender: 'M',
    home_team: 'Maldon 2',
    _id: '12-Jan-19:Maldon 2'
  }];

  let testRepo = {
    getAllFixtures() {
      return Promise.resolve(test_fixtures)
    },
    refreshAllFixtures() {
      return Promise.resolve(test_fixtures)
    },
    getFixturesFor(team, gender) {
      return Promise.resolve(test_fixtures.filter((fixture) => {
        console.log(fixture);
        return (fixture.home_team === team || fixture.away_team === team) && fixture.gender === gender
      }))
    }
  }

  beforeEach(() => {
    return server.start({
      port: Math.floor(Math.random() * (1000)) + 3000,
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can return all fixtures', (done) => {
    request(app)
      .get('/fixtures')
      .expect((res) => {
        res.body.should.containEql({
          _id: '29-Sep-18:Old Loughts Academy',
          away_team: 'Chelmsford 2',
          division: '3se',
          fixture_date: '29-Sep-18',
          gender: 'M',
          home_team: 'Old Loughts Academy'
        })
      })
      .expect(200, done)
  })
  it('can refresh from source all fixtures with a POST', (done) => {
    request(app)
      .post('/fixtures')
      .expect((res) => {
        res.body.should.containEql({
          _id: '29-Sep-18:Old Loughts Academy',
          away_team: 'Chelmsford 2',
          division: '3se',
          fixture_date: '29-Sep-18',
          gender: 'M',
          home_team: 'Old Loughts Academy'
        })
      })
      .expect(200, done)
  })
  it('returns 200 for an known team\'s fixtures' , (done) => {
    request(app)
      .get('/fixtures/Maldon 2?gender=F')
      .expect((res) => {
        res.body.should.deepEqual([
          {
            away_team: 'Maldon 2',
            division: '4se',
            fixture_date: '08-Dec-18',
            gender: 'F',
            home_team: 'Basildon 1',
            _id: '08-Dec-18:Basildon 1'
          }
        ])
      })
      .expect(200, done)
  })
})
