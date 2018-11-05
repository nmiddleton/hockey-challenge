var express = require('express'),
  router = express.Router(),
  getEMLFixturesPageForScrape = require('../lib/getEMLFixturesPageForScrape'),
  getEMLTablePageForScrape = require('../lib/getEMLTablePageForScrape');

//  when http://localhost:3333/EMLFixtures/3se    is received
router.get('/:id', getEMLFixturesPageForScrape, function(req, res){});

module.exports = router;
