'use strict'
const Scrape = require('../../../src/app/Scrape')
const scrape = new Scrape()
const getNextFixtureFrom = require('./getNextFixtureFrom')

const repository = (db) => {
  const fixtures_collection = db.collection('fixtures')
  const fixtures = []
  const query_away_team = {away_team: {$exists: true}}


  const getAllFixtures = () => {
    return new Promise((resolve, reject) => {
      // Get the documents as a cursor (for iteration through)
      const cursor = fixtures_collection.find(query_away_team)


      cursor.forEach((fixture) => {
        console.log('found!', JSON.stringify(fixture, null, 4));
        // saves to private variable fixtures
        fixtures.push(fixture)
      }, (err, doc) => {
        if (err) {
          reject(new Error('Error finding fixtures: ' + err))
        } else {
          if (!!doc && doc.count === 0) {
            console.log('None found')
          }
          resolve(fixtures)
        }
      })
    })
  }
  const refreshAllFixtures = () => {
    return scrape.EMLTables()
      .then((league) => {
        return scrape.EMLFixturesAsCollection(scrape.getLeagueDivisions(league))
      })
      .then((fixtures) => {
        fixtures_collection.drop((err, res) => {
          if (err) throw err
          console.log('Collection dropped:')
        })
        fixtures_collection.insertMany(fixtures, (err, res) => {
          if (err) throw err
          console.log('No. of documents inserted:', res.insertedCount)
        })
      })
  }
  const getFixturesFor = (team) => {
    const query_team = {$or: [{home_team: team},{away_team: team} ] },
      team_fixtures = []
    return new Promise((resolve, reject) => {
      // Get the documents as a cursor (for iteration through)
      const cursor = fixtures_collection.find(query_team)


      cursor.forEach((fixture) => {
        console.log('found!', JSON.stringify(fixture, null, 4));
        // saves to private variable fixtures
        team_fixtures.push(fixture)
      }, (err, doc) => {
        if (err) {
          reject(new Error('Error finding fixtures: ' + err))
        } else {
          if (!!doc && doc.count === 0) {
            console.log('None found')
          }
          resolve(team_fixtures)
        }
      })
    })
  }

  const getNextFixtureFor = (team, dd_mmm_yy) => {
    return new Promise((resolve, reject) => {
      getFixturesFor(team)
        .then((fixtures) => {
          resolve(getNextFixtureFrom(fixtures, dd_mmm_yy))
        })
    })
  }


  // this will close the database connection
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllFixtures,
    getFixturesFor,
    getNextFixtureFor,
    refreshAllFixtures,
    disconnect
  })

}
const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied'))
    }
    resolve(repository(connection))

  })
}
// this only exports a connected repo
module.exports = Object.assign({}, {connect})



