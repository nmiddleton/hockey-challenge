const Prediction = require('../../src/app/Prediction'),
  Scrape = require('../../src/app/Scrape');

module.exports = function (req, res, next) {
  let prediction = new Prediction();
  Scrape().EMLTables().then(function (result) {
    prediction.setLeagueTable(result);
    prediction.setTeamPerformanceData();
    res.send(JSON.stringify(prediction.getTeamPerformanceData() ,null,4));
    res.end();
  });
};
