const Prediction = require('../../src/app/Prediction'),
  Scrape = require('../../src/app/Scrape');

module.exports = function (req, res, next) {
  let prediction = new Prediction(),
      scrape = new Scrape();
  scrape.EMLTables().then(function (league) {
    prediction.setLeagueTable(league);
    prediction.setTeamPerformanceData();
    scrape.EMLFixtures(scrape.getLeagueDivisions(league)).then(function(){
      prediction.setFixtureList(scrape.fixture_list);
      console.log('id',req.params.id);
      if (req.params.id){
        res.send(JSON.stringify(prediction.getNextFixtureFor('30-Nov-18',req.params.id),null,4));
      } else {
        res.send(JSON.stringify(scrape.fixture_list, null, 4));
      }
      res.end();
    })


  });
};
