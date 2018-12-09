'use strict'

const repository = (db) => {
  const collection = db.collection('fixtures')
  const fixtures = []
  const query_away_team = {away_team: {$exists: true}}



  const getAllFixtures = () => {
    return new Promise((resolve, reject) => {
      // Get the documents as a cursor (for iteration through)
      const cursor = collection.find(query_away_team)


      cursor.forEach((fixture) => {
        console.log('found!',JSON.stringify(fixture ,null,4));
        // saves to private variable fixtures
        fixtures.push(fixture)
      }, (err, doc) => {
        console.log('oops', err, doc, fixtures);
        if (err) {
          reject(new Error('Error finding fixtures: ' +err))
        } else {
          if (!!doc && doc.count === 0) {
            console.log('None found')
          }
          resolve(fixtures)
        }
      })
    })
  }


  // this will close the database connection
  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getAllFixtures,
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




