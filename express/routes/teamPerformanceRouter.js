var express = require('express'),
    router = express.Router(),
    getTeamPerformance = require('../lib/getTeamPerformance'),
    getTeamPerformanceFor = require('../lib/getTeamPerformanceFor');

//  when http://localhost:3333/team_performance/    is received
router.get('/', getTeamPerformance, function(req, res){});
router.get('/:id', getTeamPerformanceFor, function(req, res){});

module.exports = router;
