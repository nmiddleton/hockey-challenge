const Prediction = require('../../src/app/Prediction'),
  Scrape = require('../../src/app/Scrape'),
    _ = require('lodash');

module.exports = function (req, res, next) {
  let prediction = new Prediction();
  Scrape().EMLTables().then(function (result) {
    prediction.setLeagueTable(result);
    prediction.setTeamPerformanceData();
    if (req.params.id){
      res.send(JSON.stringify(_.find(prediction.getTeamPerformanceData(), function(team_data){ return team_data.id.toUpperCase() === req.params.id.toUpperCase()}),null,4));
    } else {
      res.send(JSON.stringify(prediction.getTeamPerformanceData() ,null,4));
    }

    res.end();
  });
};
