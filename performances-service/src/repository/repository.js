'use strict'
const Scrape = require('../../../src/app/Scrape')

const repository = (db) => {
  const performances_collection = db.collection('performances')
  const performances = []
  const query = {}


  const getAllPerformances = () => {
    return new Promise((resolve, reject) => {
      // Get the documents as a cursor (for iteration through)
      const cursor = performances_collection.find(query)


      cursor.forEach((performance) => {
        console.log('found!', performances.length, 'matches');
        // saves to private variable performances
        performance['id'] = performance['_id']
        delete performance['_id']
        performances.push(performance)
      }, (err, doc) => {
        if (err) {
          reject(new Error('Error finding performances: ' + err))
        } else {
          if (!!doc && doc.count === 0) {
            console.log('None found')
          }
          resolve(performances)
        }
      })
    })
  }
  const getPerformanceFor = (team) => {
    let team_query = {'_id': team}
    console.log('getPerformanceFor looking for', team_query);

    return new Promise((resolve, reject) => {
      // Get the documents as a cursor (for iteration through)
      performances_collection.findOne(team_query, (err,performance) => {
        if (err) reject(err);

        performance['id'] = performance['_id']
        delete performance['_id']
        resolve(performance)
        }
      )
    })
  }

  const getPerformancesFor = (team_partial) => {
    team_partial = team_partial.replace('*', '.*')

    let performances = [],
      team_query = {'_id': new RegExp('^' + team_partial, 'i') }

    return new Promise((resolve, reject) => {
      const cursor = performances_collection.find(team_query)

      cursor.forEach((performance) => {
        console.log('found!', team_query, JSON.stringify(performance, null, 4));
        // saves to private variable performances
        performance['id'] = performance['_id']
        delete performance['_id']
        performances.push(performance)
      }, (err, doc) => {
        if (err) {
          reject(new Error('Error finding performances: ' + err))
        } else {
          if (!!doc && doc.count === 0) {
            console.log('None found')
          }
          resolve(performances)
        }
      })
    })
  }

  const refreshAllPerformances = () => {
    return new Promise((resolve, reject) => {
      return Scrape().EMLTablesAsCollection()
        .then((performances) => {

          performances_collection.drop((err, res) => {
            console.log('Collection dropped:')
          })
          performances_collection.insertMany(performances, (err, res) => {
            if (err) reject(err)
            console.log('No. of performances inserted:', res.insertedCount)
            resolve(performances)
          })
        })
    })
  }


  // this will close the database connection
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllPerformances,
    getPerformanceFor,
    getPerformancesFor,
    refreshAllPerformances,
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




