const Prediction = require('../../src/app/Prediction'),
  Scrape = require('../../src/app/Scrape'),
  moment = require('moment');

module.exports = function (req, res, next) {
  let prediction = new Prediction(),
      scrape = new Scrape();
  scrape.EMLTables().then(function (league) {
    prediction.setLeagueTable(league);
    prediction.setTeamPerformanceData();
    scrape.EMLFixtures(scrape.getLeagueDivisions(league)).then(function(){
      prediction.setFixtureList(scrape.fixture_list);
      if (req.params.id){
        res.send(JSON.stringify(prediction.getNextFixtureFor(moment.utc().format('DD-MMM-YY'),req.params.id),null,4));
      } else {
        res.send(JSON.stringify(prediction.getFixtureList(scrape.fixture_list), null, 4));
      }
      res.end();
    })


  });
};
