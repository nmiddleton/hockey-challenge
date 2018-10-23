const _ = require('lodash'),
    moment = require('moment');


function Prediction() {
    let fixture_list,
        league_tables;

    function setLeagueTable(tables) {
        league_tables = tables;
    }

    function getLeagueTable() {
        return league_tables;
    }

    function setFixtureList(list) {
        fixture_list = list;
    }

    function getFixtureList() {
        return fixture_list;
    }

    function getDivisionFor(team) {
        return _.findKey(league_tables, function (division) {
            return _.has(division, team);
        });
    }

    function getNextFixtureFor(dd_mmm_yy, team) {
        let next_fixture_date,
            target_date_as_moment,
            date_closeness = 365;
        if (dateIsValid(dd_mmm_yy)) {
            target_date_as_moment = moment(dd_mmm_yy, 'DD-MMM-YY', true)
        } else {
            throw new Error('Given date not valid: ' + dd_mmm_yy);
        }
        let division_of_team = getDivisionFor(team);
        _.forEach(_.keys(fixture_list[division_of_team]), function (dd_mmm_yy_fixture) {
            let fixture_date_as_moment;
            if (dateIsValid(dd_mmm_yy_fixture)) {
                fixture_date_as_moment = moment(dd_mmm_yy_fixture, 'DD-MMM-YY', true)
            } else {
                throw new Error('Fixture date not valid: ' + dd_mmm_yy_fixture);
            }
            // Find the first date in the nearest future
            if (fixture_date_as_moment.isAfter(target_date_as_moment)) {
                if (fixture_date_as_moment.diff(target_date_as_moment, 'days') < date_closeness) {
                    date_closeness = fixture_date_as_moment.diff(target_date_as_moment, 'days');
                    next_fixture_date = dd_mmm_yy_fixture;
                }
            }
        });
        // If a date was found, get the fixture
        if (!!next_fixture_date &&
            _.some(fixture_list[division_of_team][next_fixture_date], {'home_team': team})
            || _.some(fixture_list[division_of_team][next_fixture_date], {'away_team': team})
        ) {
            return _.find(fixture_list[division_of_team][next_fixture_date], function (fixture) {
                return team === fixture.home_team || team === fixture.away_team;
            })
        } else {
            throw new Error('No fixture found for team: ' + team + 'in div: ' + division_of_team);
        }
    }

    function dateIsValid(date) {
        if (date.length === 8) {
            date = 0 + date; //pad leading zero in 1-Dec-18 > 01-Dec-18
        }
        return moment(date, 'DD-MMM-YY', true).isValid();
    }
    function onGoalDifference(fixture) {
        let goal_diff = {},
            division = getDivisionFor(fixture.home_team);
        goal_diff[fixture.home_team] = _.get(league_tables[division][fixture.home_team], 'goal_difference');
        goal_diff[fixture.away_team] = _.get(league_tables[division][fixture.away_team], 'goal_difference');
        return goal_diff;
    }

    function onDefenders(fixture) {
        let defender_performance = {},
            division = getDivisionFor(fixture.home_team);
        defender_performance[fixture.home_team] = _.get(league_tables[division][fixture.home_team], 'against');
        defender_performance[fixture.away_team] = _.get(league_tables[division][fixture.away_team], 'against');
        return defender_performance;
    }

    function onForwards(fixture) {
        let forward_performance = {},
            division = getDivisionFor(fixture.home_team);
        forward_performance[fixture.home_team] = _.get(league_tables[division][fixture.home_team], 'for');
        forward_performance[fixture.away_team] = _.get(league_tables[division][fixture.away_team], 'for');
        return forward_performance;
    }

    return {
        getLeagueTable: getLeagueTable,
        setLeagueTable: setLeagueTable,
        getFixtureList: getFixtureList,
        setFixtureList: setFixtureList,
        getDivisionFor: getDivisionFor,
        getNextFixtureFor: getNextFixtureFor,
        onGoalDifference: onGoalDifference,
        onDefenders: onDefenders,
        onForwards: onForwards
    }
}


module.exports = Prediction;