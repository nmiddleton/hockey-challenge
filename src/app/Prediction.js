const _ = require('lodash'),
    moment = require('moment');


function Prediction() {
    let fixture_list,
        league_tables,
        team_performance_data;

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

    function  setTeamPerformanceData () {
        team_performance_data  = constructTeamPerformanceData();
    }

    function constructTeamPerformanceData() {
        let team_perf_data = [];
        _.forEach(_.keys(league_tables), function (division) {

            _.forEach(_.keys(league_tables[division]), function (team) {
                let team_stats = (league_tables[division][team]);
                team_stats['division'] = division;
                team_stats['id'] = team;
                team_perf_data.push(team_stats);
            })
        });
        return team_perf_data;
    }

    function getTeamPerformanceData() {
        return team_performance_data;
    }

    function getDivisionFor(team) {
        return _.findKey(league_tables, function (division) {
            return _.has(division, team);
        });
    }

    function getNextFixtureFor(dd_mmm_yy, team) {
        let next_fixture_date,
            target_date_as_moment,
            date_closeness = 365,
            next_fixture_for = { id: team};
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
            let fixture_found =  _.find(fixture_list[division_of_team][next_fixture_date], function (fixture) {
                return team === fixture.home_team || team === fixture.away_team;
            });
            next_fixture_for.home_team = fixture_found.home_team;
            next_fixture_for.away_team = fixture_found.away_team;
            return next_fixture_for;
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

    return {
        getLeagueTable: getLeagueTable,
        setLeagueTable: setLeagueTable,
        getFixtureList: getFixtureList,
        setFixtureList: setFixtureList,
        getTeamPerformanceData: getTeamPerformanceData,
        constructTeamPerformanceData: constructTeamPerformanceData,
        setTeamPerformanceData: setTeamPerformanceData,
        getDivisionFor: getDivisionFor,
        getNextFixtureFor: getNextFixtureFor
    }
}


module.exports = Prediction;
