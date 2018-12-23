'use strict';
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options
  const checkDebugMode = (query, response) => {
    if (query.hasOwnProperty('debug') && query['debug'] === 'true') {
      console.log('DEBUG Mode is ON')
      console.log(JSON.stringify(response, null, 4))
    }
  }

  app.get('/performances', (req, res, next) => {
    repo.getAllPerformances()
      .then(performances=> {
        checkDebugMode(req.query, performances)
        res.status(status.OK).json(performances)
      })
      .catch(next)
  })
  app.post('/performances', (req, res, next) => {
    repo.refreshAllPerformances()
      .then(performances => {
        checkDebugMode(req.query, performances)
        res.status(status.OK).json(performances)
      })
      .catch(next)
  })
  app.get('/performances/:team_partial', (req, res, next) => {
    // match a partial team
    repo.getPerformancesFor(req.params.team_partial)
      .then(performances=> {
        checkDebugMode(req.query, performances)
        res.status(status.OK).json(performances)
      })
      .catch(next)
  })
  app.get('/performance/:id', (req, res, next) => {
    // match an exact tesm
    repo.getPerformanceFor(req.params.id)
      .then(performance=> {
        checkDebugMode(req.query, performance)
        res.status(status.OK).json(performance)
      })
      .catch(next)
  })
}
