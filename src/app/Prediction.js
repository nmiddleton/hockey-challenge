


function Prediction() {
    let fixture_list,
        league_tables;
    function setLeagueTable(tables){
        league_tables = tables;
    }

    function getLeagueTable(){
        return league_tables;
    }

    function setFixtureList(list){
        fixture_list = list;
    }

    function getFixtureList(){
        return fixture_list;
    }

    return {
        getLeagueTable: getLeagueTable,
        setLeagueTable: setLeagueTable,
        getFixtureList: getFixtureList,
        setFixtureList: setFixtureList,
    }
}


module.exports = Prediction;