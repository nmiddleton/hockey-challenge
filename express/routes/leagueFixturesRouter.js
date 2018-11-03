var express = require('express'),
  router = express.Router(),
  getleagueFixtures = require('../lib/getleagueFixtures');
  getleagueFixtureFor = require('../lib/getleagueFixtureFor');

//  when http://localhost:3333/league_fixtures/    is received
router.get('/', getleagueFixtures, function(req, res){});
//  when http://localhost:3333/league_fixtures/Chelsmford 7    is received
router.get('/:id', getleagueFixtureFor, function(req, res){});

module.exports = router;
