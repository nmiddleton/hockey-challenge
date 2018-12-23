'use strict';
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options,
    checkDebugMode = (req, response) => {
        console.log('DEBUG Mode is ON');
        console.log('REQ Query', JSON.stringify(req.query ,null,4));
        console.log('REQ PARAMS', JSON.stringify(req.params ,null,4));
        console.log(JSON.stringify(response, null, 4))
    }

  app.get('/fixtures', (req, res, next) => {
    repo.getAllFixtures()
      .then(fixtures => {
        checkDebugMode(req, fixtures)
        res.status(status.OK).json(fixtures)
      })
      .catch(next)
  })
  app.post('/fixtures', (req, res, next) => {
    repo.refreshAllFixtures()
      .then(fixtures => {
        checkDebugMode(req, fixtures)
        res.status(status.OK).json(fixtures)
      })
      .catch(next)
  })
  app.get('/fixtures/:id', (req, res, next) => {
    repo.getFixturesFor(req.params.id, req.query.gender).then(fixtures => {
      checkDebugMode(req, fixtures)
      res.status(status.OK).json(fixtures)
    }).catch(next)
  })
  app.get('/next_fixture_for/:id', (req, res, next) => {
    repo.getNextFixtureFor(req.params.id, req.query.gender).then(fixtures => {
      checkDebugMode(req, fixtures)
      res.status(status.OK).json(fixtures)
    }).catch(next)
  })
}
