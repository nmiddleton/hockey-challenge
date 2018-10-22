const request = require("request-promise"),
    q = require('q'),
    cheerio = require("cheerio"),
    _ = require("lodash"),
    moment = require('moment');

let this_league = {},
    fixture_list = {};

function Scrape() {
    const eml_table_url = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/tablesmen.asp?divblock=SE&Submit=League+table',
        eml_performance_base_url = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/resultsmen.asp?division=',
        performance_property = ['played', 'win', 'draw', 'lose', 'for', 'against', 'goal_difference', 'points'];

    function EMLTables() {
        let division,
            team_name,
            value_count,
            deferred = q.defer();

        request.get(eml_table_url).then(function (result) {
            const $ = cheerio.load(result);
            // No css classes. Looking for the width 150 of the element == disgusting
            return q($('td').each(function (i, elem) {
                let td_text = $(this).text().trim();
                if ($(this).attr('width') === '150') {
                    // DIV/team_name are both in the width 150 element
                    td_text = td_text.trim();
                    if (_.startsWith(td_text, 'DIVISION')) {
                        division = _.trim(td_text.toLowerCase(), '\s+division ');
                        // Initialize the division object
                        _.set(this_league, division, {});
                    } else if (_.words(td_text).length > 0) {
                        // It's a team_name
                        team_name = td_text;
                        // Initialize the team's performance JSON
                        _.set(this_league[division], team_name, {});
                        value_count = 0; //start tracking the performance counter in the array of performance_property
                    }
                } else if ($(this).attr('width') === '30') {
                    // It;s a performance property
                    if (performance_property[value_count]) { //tracked
                        _.set(this_league[division][team_name], performance_property[value_count], td_text);
                    }
                    value_count++;
                }
            })).then(function () {
                deferred.resolve(this_league);
            }).catch(function (err) {
                deferred.reject(err);
            });
        });
        return deferred.promise;
    }

    function getLeagueDivisions(league) {
        return _.keys(league);
    }

    function EMLFixtures(divisions) {
        let deferred = q.defer();
        // create array of promises
        let division_get_promises = _.map(divisions, function (division) {
            return EMLFixturesFor(division);
        });
        q.allSettled(division_get_promises).then(function (division_responses) {
            _.forEach(division_responses, function (response) {
                _.assign(fixture_list, response.value);
            });
            deferred.resolve(fixture_list);
        }).done();
        return deferred.promise;

    }

    function EMLFixturesFor(division) {
        let division_fixtures = {};
        //Initialize the division object
        division_fixtures[division] = {};
        let eml_performance_url = eml_performance_base_url + division,
            deferred = q.defer();

        request.get(eml_performance_url).then(function (result) {
            const $ = cheerio.load(result);
            let fixture_date = '',
                home_team = '',
                away_team = '';
            return q($('td').each(function (i, elem) {
                let td_text = $(this).text().trim();

                //Again, no cheerio anchors except for td width :(
                if ($(this).attr('width') === '225') {
                    // Is the td the date or home team in fixture?
                    if (moment(td_text, 'DD-MMM-YY', true).isValid() || moment(td_text, 'D-MMM-YY', true).isValid()) {
                        // is a date
                        fixture_date = td_text;
                        _.set(division_fixtures[division], fixture_date, []);
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
                        division_fixtures[division][fixture_date].push({home_team: home_team, away_team: away_team});
                    }
                }
            })).then(function () {
                // return the fixtures for this division
                deferred.resolve(division_fixtures);
            }).catch(function (err) {
                deferred.reject('Error with fixture list', err);
            });

        });
        return deferred.promise;
    }

    return {
        EMLTables: EMLTables,
        getLeagueDivisions: getLeagueDivisions,
        EMLFixtures: EMLFixtures
    }
}

module.exports = Scrape;