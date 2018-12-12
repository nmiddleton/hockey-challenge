'use strict';
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/performances', (req, res, next) => {
    repo.getAllPerformances()
      .then(performances=> {
        res.status(status.OK).json(performances)
      })
      .catch(next)
  })
  app.post('/performances', (req, res, next) => {
    repo.refreshAllPerformances()
      .then(performances => {
        res.status(status.OK).json(performances)
      })
      .catch(next)
  })
  app.get('/performances/:team_partial', (req, res, next) => {
    // match a partial team
    repo.getPerformancesFor(req.params.team_partial)
      .then(performances=> {
        res.status(status.OK).json(performances)
      })
      .catch(next)
  })
  app.get('/performance/:id', (req, res, next) => {
    // match an exact tesm
    repo.getPerformanceFor(req.params.id)
      .then(performance=> {
        res.status(status.OK).json(performance)
      })
      .catch(next)
  })
}
