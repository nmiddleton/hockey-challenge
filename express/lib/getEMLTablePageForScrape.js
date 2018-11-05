const request = require("request-promise"),
  q = require('q'),
  eml_table_url = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/tablesmen.asp?divblock=SE&Submit=League+table';

module.exports = function (req, res,next) {
  let deferred = q.defer();
  request.get(eml_table_url).then(function (result) {
    res.send(result);
    res.end();

    deferred.resolve();
  }).catch(function(err){
    deferred.reject('ERROR getting league table: ' + err);
  });
  return deferred.promise;
};
