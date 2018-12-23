const request = require('request-promise'),
  q = require('q'),
  cheerio = require('cheerio'),
  _ = require('lodash'),
  moment = require('moment'),
  api_url_EMLTable = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/tablesmen.asp?divblock=SE&Submit=League+table',
  api_url_EWLTable = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/tableswomen.asp',
  api_url_EMLFixtures = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/resultsmen.asp?division=',
  api_url_EWLFixtures = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/venueswomen.asp?division=',
  http_timeout = 1000;


function Scrape() {
  const performance_property = ['played', 'win', 'draw', 'lose', 'for', 'against', 'goal_difference', 'points'];

  function ALLTablesAsCollection() {
    let team_performances = [];
    return EMLTablesAsCollection()
      .then(function (eml_team_performances) {
        team_performances = eml_team_performances;
        return EWLTablesAsCollection()
          .then(function (ewl_team_performances) {
            return _.union(team_performances, ewl_team_performances)
          })
          .catch((err) => {
            throw new Error(err)
          })
      })
  }

  function EMLTablesAsCollection() {
    return tableAsCollection(api_url_EMLTable, 'M')
  }

  function EWLTablesAsCollection() {
    return tableAsCollection(api_url_EWLTable, 'F')
  }

  function tableAsCollection(url, gender) {
    let division,
      value_count,
      deferred = q.defer();
    setTimeout(() => deferred.resolve([]), http_timeout)

    request.get(url).then(function (result) {
      const $ = cheerio.load(result);

      let team_performances = [];
      let team_performance;
      // No css classes. Looking for the width 150 of the element == disgusting
      return q($('td').each(function (i, elem) {
        let td_text = $(this).text().trim();
        if ($(this).attr('width') === '150') {
          // DIV/team_name are both in the width 150 element
          td_text = td_text.trim();
          if (_.startsWith(td_text, 'DIVISION') || _.startsWith(td_text, 'PREMIER')) {
            let pattern = /division /gi
            division = td_text.replace(pattern, '').toLowerCase();
            division = _.replace(division, 'ier', '');
          } else if (_.words(td_text).length > 0) {
            // It's a team_name
            team_performance = {
              _id: gender + ':' + td_text,
              team: td_text,
              division: division,
              gender: gender
            }
            value_count = 0; //start tracking the performance counter in the array of performance_property
          }
        } else if ($(this).attr('width') === '30') {
          // It's a performance property
          if (performance_property[value_count]) { //tracked
            team_performance[performance_property[value_count]] = td_text;
          }
          value_count++;
          if (value_count === performance_property.length) {
            team_performances.push(team_performance);
          }
        }
      })).then(function () {
        deferred.resolve(team_performances);
      }).catch(function (err) {
        deferred.reject(err);
      });
    });
    return deferred.promise;
  }

  function getDivisionsFrom(team_performances) {
    return _.uniqWith(_.map(team_performances, (perf) => ({
      division: perf.division,
      gender: perf.gender
    })), _.isEqual)
  }

  function parseEML(division_metadata) {
    let home_team = '',
      away_team = '',
      fixture_date = '',
      fixtures = [],
      deferred = q.defer();
    setTimeout(() => deferred.resolve([]), http_timeout)
    request.get(api_url_EMLFixtures + division_metadata.division).then(function (result) {
      const $ = cheerio.load(result);
      return q($('td').each(function (i, elem) {
        let td_text = $(this).text().trim();

        // no cheerio anchors except for td width :(

        if ($(this).attr('width') === '225') {
          // Is the td the date or home team in fixture?
          if (moment(td_text, 'DD-MMM-YY', true).isValid() || moment(td_text, 'D-MMM-YY', true).isValid()) {
            // is a date
            fixture_date = sanitiseDate(td_text);
          } else {
            // is a home team
            home_team = td_text;
          }
        }
        if ($(this).attr('width') === '275') {
          if (_.words(td_text).length > 0) {
            // is away team
            away_team = td_text;
            // date, home_team and away_team found, create the JSON record
            fixtures.push({
              _id: division_metadata.gender + ':' + division_metadata.division + ':' + fixture_date + ':' + home_team,
              division: division_metadata.division,
              fixture_date: fixture_date,
              home_team: home_team,
              away_team: away_team,
              gender: division_metadata.gender
            });
          }
        }
      })).then(function () {
        // return the fixtures for this division
        deferred.resolve(fixtures);
      }).catch(function (err) {
        deferred.reject(new Error('Error with fixture list: ' + err));
      });
    })
    return deferred.promise;
  }

  function parseEWL(division_metadata) {
    let home_team = '',
      away_team = '',
      fixture_date = '',
      fixtures = [],
      deferred = q.defer();
    setTimeout(() => deferred.resolve([]), http_timeout)
    request.get(api_url_EWLFixtures + division_metadata.division).then(function (result) {
      const $ = cheerio.load(result);
      return q($('td').each(function (i, elem) {
        let td_text = $(this).text().trim();
        //Again, no cheerio anchors except for td width :(
        if ($(this).attr('width') === '294') {
          let maybe_date = td_text
          maybe_date = maybe_date.replace(/\s+:/g, '')
          // Is the td the date or home team in fixture?
          if (moment(maybe_date, 'DD-MMM-YY', true).isValid() || moment(maybe_date, 'D-MMM-YY', true).isValid()) {
            // is a date
            fixture_date = sanitiseDate(maybe_date);
          } else {
            [home_team, away_team] = _.split(td_text, ' : ');
            fixtures.push({
              _id: division_metadata.gender + ':' + division_metadata.division + ':' + fixture_date + ':' + home_team,
              division: division_metadata.division,
              fixture_date: fixture_date,
              home_team: home_team,
              away_team: away_team,
              gender: division_metadata.gender
            });
          }
        }
      })).then(function () {
        // return the fixtures for this division
        deferred.resolve(fixtures);
      }).catch(function (err) {
        deferred.reject(new Error('Error with fixture list: ' + err));
      });
    })
    return deferred.promise;
  }
  function ALLFixturesAsCollection(divisions) {
    let deferred = q.defer(),
      fixture_collection = [];
    // create array of promises
    let division_get_promises = _.map(divisions, function (division) {
      return ALLFixturesAsCollectionFor(division);
    });
    q.allSettled(division_get_promises).then(function (division_responses) {
      _.forEach(division_responses, function (response) {
        fixture_collection = _.union(fixture_collection, response.value);
      });
      deferred.resolve(fixture_collection);
    })
    return deferred.promise;
  }

    function ALLFixturesAsCollectionFor(division_metadata) {
      //Initialize the division object
      let deferred = q.defer();
      if (division_metadata.gender === 'M') {
        parseEML(division_metadata).then(function (division_fixtures) {
          // return the fixtures for this division
          deferred.resolve(_.uniqBy(division_fixtures, '_id'));
        }).catch(function (err) {
          deferred.reject(new Error('Error with fixture list: ' + err));
        });
      } else if (division_metadata.gender === 'F') {
        parseEWL(division_metadata).then(function (division_fixtures) {
          // return the fixtures for this division
          deferred.resolve(_.uniqBy(division_fixtures, '_id'));
        }).catch(function (err) {
          deferred.reject(new Error('Error with fixture list: ' + err));
        });
      }
      return deferred.promise;
    }

  function sanitiseDate(date) {
    if (date.length === 8) {
      return 0 + date; //pad leading zero in 1-Dec-18 > 01-Dec-18
    } else {
      return date;
    }
  }

  return {
    ALLTablesAsCollection: ALLTablesAsCollection,
    getDivisionsFrom: getDivisionsFrom,
    parseEML: parseEML,
    parseEWL: parseEWL,
    EMLTablesAsCollection: EMLTablesAsCollection,
    EWLTablesAsCollection: EWLTablesAsCollection,
    ALLFixturesAsCollection: ALLFixturesAsCollection
  }
}

module.exports = Scrape;
