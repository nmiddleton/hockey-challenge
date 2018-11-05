const request = require("request-promise"),
  q = require('q'),
  eml_performance_base_url = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/resultsmen.asp?division=';

module.exports = function (req, res, next) {
  let deferred = q.defer(),
    url = eml_performance_base_url + req.params.id;

  request.get(url).then(function (result) {
    res.send(result);
    res.end();
    deferred.resolve();

  }).catch(function (err) {
    deferred.reject('ERROR getting league table: ' + err);
  });
  return deferred.promise;
};

