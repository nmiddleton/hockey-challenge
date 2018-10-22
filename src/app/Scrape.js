const request = require("request-promise"),
    q = require('q'),
    cheerio = require("cheerio"),
    _ = require("lodash");

let this_league = {};

function Scrape() {
    const eml_table_url = 'http://www.east-hockey.com/leagues2/showdata/sqlresults/tablesmen.asp?divblock=SE&Submit=League+table',
        performance_property = ['played', 'win', 'draw', 'lose', 'for', 'against', 'goal_difference', 'points'];

    function EMLTables() {
        let division,
            team_name,
            value_count,
            deferred = q.defer();

        request.get(eml_table_url).then(function (result) {
            const $ = cheerio.load(result);
            // No css classes aarg! Looking for the width 150 of the element
            return q($('td').each(function (i, elem) {
                let td_text = $(this).text().trim();
                if ($(this).attr('width') === '150') {
                    // DIV/team_name are both in the width 150 element
                    td_text = td_text.trim();
                    if (_.startsWith(td_text, 'DIVISION')) {
                        division = _.trim(td_text.toLowerCase(), '\s+division ');
                        // console.log('_.set(', this_league, this_division, {});
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


    return {
        EMLTables: EMLTables,
        getLeagueDivisions: getLeagueDivisions,
    }
}

module.exports = Scrape;