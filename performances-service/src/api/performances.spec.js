/* eslint-env mocha */

const request = require('supertest')
const server = require('../server/server')

describe('Performances API', () => {
  let app = null
  let test_performances = [
    {
      played: '6',
      win: '6',
      draw: '0',
      lose: '0',
      for: '31',
      against: '7',
      goal_difference: '24',
      points: '18',
      division: '3se',
      _id: 'Brentwood 1'
    }, {
      played: '6',
      win: '2',
      draw: '2',
      lose: '2',
      for: '23',
      against: '4',
      goal_difference: '19',
      points: '8',
      division: '4se',
      _id: 'Brentwood 2'
    }, {
      played: '6',
      win: '5',
      draw: '1',
      lose: '0',
      for: '27',
      against: '7',
      goal_difference: '20',
      points: '16',
      division: '3se',
      _id: 'Wapping 5'
    }
  ];
  let testRepo = {
    getAllPerformances() {
      return Promise.resolve(test_performances)
    },
    getPerformancesFor(team_partial) {
      return Promise.resolve([test_performances[0], test_performances[1]])
    },
    getPerformanceFor(team) {
      return Promise.resolve(test_performances.filter((performance) => performance._id === team))
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

  it('can return all performances', (done) => {
    request(app)
      .get('/performances')
      .expect((res) => {
        res.body.should.containEql({
          played: '6',
          win: '5',
          draw: '1',
          lose: '0',
          for: '27',
          against: '7',
          goal_difference: '20',
          points: '16',
          division: '3se',
          _id: 'Wapping 5'
        })
      })
      .expect(200, done)
  })
  it('can return all performances for a partial of a team', (done) => {
    request(app)
      .get('/performances/*entwood')
      .expect((res) => {
        res.body.should.deepEqual([{
          played: '6',
          win: '6',
          draw: '0',
          lose: '0',
          for: '31',
          against: '7',
          goal_difference: '24',
          points: '18',
          division: '3se',
          _id: 'Brentwood 1'
        }, {
          played: '6',
          win: '2',
          draw: '2',
          lose: '2',
          for: '23',
          against: '4',
          goal_difference: '19',
          points: '8',
          division: '4se',
          _id: 'Brentwood 2'
        }])
      })
      .expect(200, done)
  })
  it('can return performance for a given team', (done) => {
    request(app)
      .get('/performance/Wapping 5')
      .expect((res) => {
        res.body.should.containEql({
          played: '6',
          win: '5',
          draw: '1',
          lose: '0',
          for: '27',
          against: '7',
          goal_difference: '20',
          points: '16',
          division: '3se',
          _id: 'Wapping 5'
        })
      })
      .expect(200, done)
  })

})
