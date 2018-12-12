const request = require('request-promise'),
  q = require('q'),
  cheerio = require('cheerio'),
  _ = require('lodash'),
  moment = require('moment'),
  api_url_EMLTable = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/tablesmen.asp?divblock=SE&Submit=League+table',
  api_url_EMLFixtures = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/resultsmen.asp?division='
let fixture_collection = [];

function Scrape() {
  const performance_property = ['played', 'win', 'draw', 'lose', 'for', 'against', 'goal_difference', 'points'];

  function EMLTablesAsCollection() {
    let division,
      value_count,
      deferred = q.defer();

    request.get(api_url_EMLTable).then(function (result) {
      const $ = cheerio.load(result);

      let team_performances = [];
      let team_performance;
      // No css classes. Looking for the width 150 of the element == disgusting
      return q($('td').each(function (i, elem) {
        let td_text = $(this).text().trim();
        if ($(this).attr('width') === '150') {
          // DIV/team_name are both in the width 150 element
          td_text = td_text.trim();
          if (_.startsWith(td_text, 'DIVISION')) {
            division = _.trim(td_text.toLowerCase(), '\s+division ');
          } else if (_.words(td_text).length > 0) {
            // It's a team_name
            team_performance = {
              _id: td_text,
              division: division
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
    return _.sortedUniq(_.map(team_performances, (perf) => perf.division));
  }

  function EMLFixturesAsCollection(divisions) {
    let deferred = q.defer();
    // create array of promises
    let division_get_promises = _.map(divisions, function (division) {
      return EMLFixturesAsCollectionFor(division);
    });
    q.allSettled(division_get_promises).then(function (division_responses) {
      _.forEach(division_responses, function (response) {

        fixture_collection = _.union(fixture_collection, response.value);
      });
      deferred.resolve(fixture_collection);
    }).done();
    return deferred.promise;
  }

  function EMLFixturesAsCollectionFor(division) {
    //Initialize the division object
    let eml_performance_url = api_url_EMLFixtures + division,
      fixtures = [],
      deferred = q.defer();

    request.get(eml_performance_url).then(function (result) {
      const $ = cheerio.load(result);
      let
        fixture_date = '',
        home_team = '',
        away_team = '';

      return q($('td').each(function (i, elem) {
        let td_text = $(this).text().trim();

        //Again, no cheerio anchors except for td width :(
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
              _id: fixture_date + ':' + home_team,
              division: division,
              fixture_date: fixture_date,
              home_team: home_team,
              away_team: away_team
            });
          }
        }
      })).then(function () {
        // return the fixtures for this division
        deferred.resolve(fixtures);
      }).catch(function (err) {
        deferred.reject(new Error('Error with fixture list: ' + err));
      });
    });
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
    fixture_collection: fixture_collection,
    getDivisionsFrom: getDivisionsFrom,
    EMLTablesAsCollection: EMLTablesAsCollection,
    EMLFixturesAsCollection: EMLFixturesAsCollection
  }
}

module.exports = Scrape;
