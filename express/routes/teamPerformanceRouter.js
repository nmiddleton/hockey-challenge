var express = require('express'),
    router = express.Router(),
    getTeamPerformance = require('../lib/getTeamPerformance');

//  when http://localhost:3333/team_performance/    is received
router.get('*', getTeamPerformance);

module.exports = router;
