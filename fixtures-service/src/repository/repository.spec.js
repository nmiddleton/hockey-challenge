/* eslint-env mocha */
const should = require('should')
const repository = require('./repository')
const getNextFixtureFrom = require('./getNextFixtureFrom')

describe('Repository', () => {
  it('should connect with a promise', (done) => {
    repository.connect({}).should.be.a.Promise()
    done()
  })
})
describe('Repository helpers', () => {
  const test_team_fixtures = [
    {
      '_id': '29-Sep-18:Maldon 1',
      'division': '3se',
      'fixture_date': '29-Sep-18',
      'home_team': 'Maldon 1',
      'away_team': 'Clacton 1'
    },
    {
      '_id': '06-Oct-18:Maldon 1',
      'division': '3se',
      'fixture_date': '06-Oct-18',
      'home_team': 'Maldon 1',
      'away_team': 'East London 3'
    },
    {
      '_id': '20-Oct-18:Maldon 1',
      'division': '3se',
      'fixture_date': '20-Oct-18',
      'home_team': 'Maldon 1',
      'away_team': 'Crostyx 2'
    },
    {
      '_id': '03-Nov-18:Maldon 1',
      'division': '3se',
      'fixture_date': '03-Nov-18',
      'home_team': 'Maldon 1',
      'away_team': 'Upminster 2'
    },
    {
      '_id': '17-Nov-18:Maldon 1',
      'division': '3se',
      'fixture_date': '17-Nov-18',
      'home_team': 'Maldon 1',
      'away_team': 'Wapping 6'
    }
  ];
  it('can find next fixtures for a team', (done) => {
    getNextFixtureFrom(test_team_fixtures, '05-Oct-18').should.deepEqual(
      {
        '_id': '06-Oct-18:Maldon 1',
        'division': '3se',
        'fixture_date': '06-Oct-18',
        'home_team': 'Maldon 1',
        'away_team': 'East London 3'
      }
    );
    getNextFixtureFrom(test_team_fixtures, '21-Oct-18').should.deepEqual(
      {
        '_id': '03-Nov-18:Maldon 1',
        'division': '3se',
        'fixture_date': '03-Nov-18',
        'home_team': 'Maldon 1',
        'away_team': 'Upminster 2'
      }
    );
    done()
  });
})
