var express = require('express'),
  router = express.Router(),
  getEMLFixturesPageForScrape = require('../lib/getEMLFixturesPageForScrape'),
  getEMLTablePageForScrape = require('../lib/getEMLTablePageForScrape');

//  when http://localhost:3333/EMLTable   is received
router.get('*', getEMLTablePageForScrape, function(req, res){});

module.exports = router;
