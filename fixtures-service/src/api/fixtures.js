'use strict';
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/fixtures', (req, res, next) => {
    repo.getAllFixtures()
      .then(fixtures => {
        res.status(status.OK).json(fixtures)
      })
      .catch(next)
  })
  app.post('/fixtures', (req, res, next) => {
    repo.refreshAllFixtures()
      .then(fixtures => {
        res.status(status.OK).json(fixtures)
      })
      .catch(next)
  })
  app.get('/fixtures/:id', (req, res, next) => {
    repo.getFixturesFor(req.params.id).then(fixtures => {
      res.status(status.OK).json(fixtures)
    }).catch(next)
  })
  app.get('/next_fixture_for/:id', (req, res, next) => {
    repo.getNextFixtureFor(req.params.id).then(fixtures => {
      res.status(status.OK).json(fixtures)
    }).catch(next)
  })
}
