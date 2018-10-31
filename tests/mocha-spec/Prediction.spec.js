const expect = require('chai').expect,
    sinon = require('sinon'),
    Prediction = require('../../src/app/Prediction');


describe('Predictions', function () {
    let sandbox,
        prediction,
        league_table,
        fixture_list,
        team_performance_data;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        prediction = new Prediction();
        fixture_list = {
            '3se': {
                '17-Nov-18': [
                    {
                        'home_team': 'Brentwood 1',
                        'away_team': 'Southend 1'
                    },
                    {
                        'home_team': 'Wapping 5',
                        'away_team': 'Braintree 1'
                    },
                    {
                        'home_team': 'Maldon 1',
                        'away_team': 'Wapping 6'
                    },
                    {
                        'home_team': 'East London 3',
                        'away_team': 'Redbridge & Ilford 1'
                    },
                    {
                        'home_team': 'Crostyx 2',
                        'away_team': 'Clacton 1'
                    },
                    {
                        'home_team': 'Upminster 2',
                        'away_team': 'Brentwood 2'
                    }
                ],
                '24-Nov-18': [
                    {
                        'home_team': 'Wapping 5',
                        'away_team': 'Maldon 1'
                    },
                    {
                        'home_team': 'Braintree 1',
                        'away_team': 'Brentwood 1'
                    },
                    {
                        'home_team': 'Southend 1',
                        'away_team': 'East London 3'
                    },
                    {
                        'home_team': 'Redbridge & Ilford 1',
                        'away_team': 'Crostyx 2'
                    },
                    {
                        'home_team': 'Clacton 1',
                        'away_team': 'Upminster 2'
                    },
                    {
                        'home_team': 'Brentwood 2',
                        'away_team': 'Wapping 6'
                    }
                ],
                '01-Dec-18': [
                    {
                        'home_team': 'Brentwood 1',
                        'away_team': 'Wapping 5'
                    },
                    {
                        'home_team': 'Maldon 1',
                        'away_team': 'Brentwood 2'
                    },
                    {
                        'home_team': 'East London 3',
                        'away_team': 'Braintree 1'
                    },
                    {
                        'home_team': 'Crostyx 2',
                        'away_team': 'Southend 1'
                    },
                    {
                        'home_team': 'Upminster 2',
                        'away_team': 'Redbridge & Ilford 1'
                    },
                    {
                        'home_team': 'Wapping 6',
                        'away_team': 'Clacton 1'
                    }
                ],
                '08-Dec-18': [
                    {
                        'home_team': 'Maldon 1',
                        'away_team': 'Brentwood 1'
                    },
                    {
                        'home_team': 'East London 3',
                        'away_team': 'Wapping 5'
                    },
                    {
                        'home_team': 'Crostyx 2',
                        'away_team': 'Braintree 1'
                    },
                    {
                        'home_team': 'Upminster 2',
                        'away_team': 'Southend 1'
                    },
                    {
                        'home_team': 'Wapping 6',
                        'away_team': 'Redbridge & Ilford 1'
                    },
                    {
                        'home_team': 'Brentwood 2',
                        'away_team': 'Clacton 1'
                    }
                ],
                '15-Dec-18': []
            },
            '10se': {
                '17-Nov-18': [
                    {
                        'home_team': 'Braintree 5',
                        'away_team': 'Romford 3'
                    },
                    {
                        'home_team': 'Chelmsford 7',
                        'away_team': 'Saffron Walden 8'
                    },
                    {
                        'home_team': 'East London 9',
                        'away_team': 'Waltham Forest 5'
                    },
                    {
                        'home_team': 'Old Loughts Willows 2',
                        'away_team': 'Old Southendian 6'
                    }
                ],
                '24-Nov-18': [
                    {
                        'home_team': 'Old Loughts Willows 2',
                        'away_team': 'East London 9'
                    },
                    {
                        'home_team': 'Romford 3',
                        'away_team': 'Old Southendian 6'
                    },
                    {
                        'home_team': 'Saffron Walden 8',
                        'away_team': 'Braintree 5'
                    },
                    {
                        'home_team': 'Waltham Forest 5',
                        'away_team': 'Chelmsford 7'
                    }
                ],
                '01-Dec-18': [
                    {
                        'home_team': 'Braintree 5',
                        'away_team': 'Waltham Forest 5'
                    },
                    {
                        'home_team': 'Chelmsford 7',
                        'away_team': 'Old Loughts Willows 2'
                    },
                    {
                        'home_team': 'Old Southendian 6',
                        'away_team': 'Saffron Walden 8'
                    },
                    {
                        'home_team': 'Romford 3',
                        'away_team': 'East London 9'
                    }
                ],
                '08-Dec-18': [
                    {
                        'home_team': 'East London 9',
                        'away_team': 'Chelmsford 7'
                    },
                    {
                        'home_team': 'Old Loughts Willows 2',
                        'away_team': 'Braintree 5'
                    },
                    {
                        'home_team': 'Saffron Walden 8',
                        'away_team': 'Romford 3'
                    },
                    {
                        'home_team': 'Waltham Forest 5',
                        'away_team': 'Old Southendian 6'
                    }
                ],
                '15-Dec-18': []
            }
        };
        league_table = {
            '10se': {
                'Braintree 5': {
                    'against': '4',
                    'draw': '1',
                    'for': '22',
                    'goal_difference': '18',
                    'lose': '0',
                    'played': '5',
                    'points': '13',
                    'win': '4',
                },
                'Chelmsford 7': {
                    'against': '3',
                    'draw': '2',
                    'for': '10',
                    'goal_difference': '7',
                    'lose': '1',
                    'played': '5',
                    'points': '8',
                    'win': '2',
                },
                'East London 9': {
                    'against': '10',
                    'draw': '1',
                    'for': '9',
                    'goal_difference': '-1',
                    'lose': '2',
                    'played': '5',
                    'points': '7',
                    'win': '2',
                },
                'Old Loughts Willows 2': {
                    'against': '4',
                    'draw': '2',
                    'for': '7',
                    'goal_difference': '3',
                    'lose': '1',
                    'played': '5',
                    'points': '8',
                    'win': '2',
                },
                'Old Southendian 6': {
                    'against': '11',
                    'draw': '0',
                    'for': '14',
                    'goal_difference': '3',
                    'lose': '2',
                    'played': '5',
                    'points': '9',
                    'win': '3',
                },
                'Romford 3': {
                    'against': '15',
                    'draw': '0',
                    'for': '13',
                    'goal_difference': '-2',
                    'lose': '3',
                    'played': '5',
                    'points': '6',
                    'win': '2',
                },
                'Saffron Walden 8': {
                    'against': '17',
                    'draw': '0',
                    'for': '7',
                    'goal_difference': '-10',
                    'lose': '4',
                    'played': '5',
                    'points': '3',
                    'win': '1',
                },
                'Waltham Forest 5': {
                    'against': '19',
                    'draw': '2',
                    'for': '1',
                    'goal_difference': '-18',
                    'lose': '3',
                    'played': '5',
                    'points': '2',
                    'win': '0',
                }
            },
            '3se': {
                'Braintree 1': {
                    'against': '9',
                    'draw': '1',
                    'for': '13',
                    'goal_difference': '4',
                    'lose': '1',
                    'played': '5',
                    'points': '10',
                    'win': '3',
                },
                'Brentwood 1': {
                    'against': '5',
                    'draw': '0',
                    'for': '26',
                    'goal_difference': '21',
                    'lose': '0',
                    'played': '5',
                    'points': '15',
                    'win': '5',
                },
                'Brentwood 2': {
                    'against': '24',
                    'draw': '0',
                    'for': '10',
                    'goal_difference': '-14',
                    'lose': '4',
                    'played': '5',
                    'points': '3',
                    'win': '1',
                },
                'Clacton 1': {
                    'against': '16',
                    'draw': '1',
                    'for': '9',
                    'goal_difference': '-7',
                    'lose': '3',
                    'played': '5',
                    'points': '4',
                    'win': '1',
                },
                'Crostyx 2': {
                    'against': '20',
                    'draw': '0',
                    'for': '6',
                    'goal_difference': '-14',
                    'lose': '4',
                    'played': '5',
                    'points': '3',
                    'win': '1',
                },
                'East London 3': {
                    'against': '17',
                    'draw': '0',
                    'for': '10',
                    'goal_difference': '-7',
                    'lose': '4',
                    'played': '5',
                    'points': '3',
                    'win': '1',
                },
                'Maldon 1': {
                    'against': '18',
                    'draw': '0',
                    'for': '12',
                    'goal_difference': '-6',
                    'lose': '3',
                    'played': '5',
                    'points': '6',
                    'win': '2',
                },
                'Redbridge &Ilford 1': {
                    'against': '8',
                    'draw': '0',
                    'for': '14',
                    'goal_difference': '6',
                    'lose': '2',
                    'played': '5',
                    'points': '9',
                    'win': '3',
                },
                'Southend 1': {
                    'against': '11',
                    'draw': '3',
                    'for': '13',
                    'goal_difference': '2',
                    'lose': '1',
                    'played': '5',
                    'points': '6',
                    'win': '1',
                },
                'Upminster 2': {
                    'against': '11',
                    'draw': '2',
                    'for': '11',
                    'goal_difference': '0',
                    'lose': '1',
                    'played': '5',
                    'points': '8',
                    'win': '2',
                },
                'Wapping 5': {
                    'against': '6',
                    'draw': '1',
                    'for': '22',
                    'goal_difference': '16',
                    'lose': '0',
                    'played': '5',
                    'points': '13',
                    'win': '4',
                },
                'Wapping 6': {
                    'against': '11',
                    'draw': '2',
                    'for': '10',
                    'goal_difference': '-1',
                    'lose': '2',
                    'played': '5',
                    'points': '5',
                    'win': '1',
                }
            }
        };
        team_performance_data = [
            {
                'division': '10se',
                'id': 'Braintree 5',
                'against': '4',
                'draw': '1',
                'for': '22',
                'goal_difference': '18',
                'lose': '0',
                'played': '5',
                'points': '13',
                'win': '4',
            },
            {
                'division': '10se',
                'id': 'Chelmsford 7',
                'against': '3',
                'draw': '2',
                'for': '10',
                'goal_difference': '7',
                'lose': '1',
                'played': '5',
                'points': '8',
                'win': '2',
            },
            {
                'division': '10se',
                'id': 'East London 9',
                'against': '10',
                'draw': '1',
                'for': '9',
                'goal_difference': '-1',
                'lose': '2',
                'played': '5',
                'points': '7',
                'win': '2',
            },
            {
                'division': '10se',
                'id': 'Old Loughts Willows 2',
                'against': '4',
                'draw': '2',
                'for': '7',
                'goal_difference': '3',
                'lose': '1',
                'played': '5',
                'points': '8',
                'win': '2',
            },
            {
                'division': '10se',
                'id': 'Old Southendian 6',
                'against': '11',
                'draw': '0',
                'for': '14',
                'goal_difference': '3',
                'lose': '2',
                'played': '5',
                'points': '9',
                'win': '3',
            },
            {
                'division': '10se',
                'id': 'Romford 3',
                'against': '15',
                'draw': '0',
                'for': '13',
                'goal_difference': '-2',
                'lose': '3',
                'played': '5',
                'points': '6',
                'win': '2',
            },
            {
                'division': '10se',
                'id': 'Saffron Walden 8',
                'against': '17',
                'draw': '0',
                'for': '7',
                'goal_difference': '-10',
                'lose': '4',
                'played': '5',
                'points': '3',
                'win': '1',
            },
            {
                'division': '10se',
                'id': 'Waltham Forest 5',
                'against': '19',
                'draw': '2',
                'for': '1',
                'goal_difference': '-18',
                'lose': '3',
                'played': '5',
                'points': '2',
                'win': '0',
            },
            {
                'division': '3se',
                'id': 'Braintree 1',
                'against': '9',
                'draw': '1',
                'for': '13',
                'goal_difference': '4',
                'lose': '1',
                'played': '5',
                'points': '10',
                'win': '3'
            },
            {
                'division': '3se',
                'id': 'Brentwood 1',
                'against': '5',
                'draw': '0',
                'for': '26',
                'goal_difference': '21',
                'lose': '0',
                'played': '5',
                'points': '15',
                'win': '5'
            },
            {
                'division': '3se',
                'id': 'Brentwood 2',
                'against': '24',
                'draw': '0',
                'for': '10',
                'goal_difference': '-14',
                'lose': '4',
                'played': '5',
                'points': '3',
                'win': '1'
            },
            {
                'division': '3se',
                'id': 'Clacton 1',
                'against': '16',
                'draw': '1',
                'for': '9',
                'goal_difference': '-7',
                'lose': '3',
                'played': '5',
                'points': '4',
                'win': '1'
            },
            {
                'division': '3se',
                'id': 'Crostyx 2',
                'against': '20',
                'draw': '0',
                'for': '6',
                'goal_difference': '-14',
                'lose': '4',
                'played': '5',
                'points': '3',
                'win': '1'
            },
            {
                'division': '3se',
                'id': 'East London 3',
                'against': '17',
                'draw': '0',
                'for': '10',
                'goal_difference': '-7',
                'lose': '4',
                'played': '5',
                'points': '3',
                'win': '1'
            },
            {
                'division': '3se',
                'id': 'Maldon 1',
                'against': '18',
                'draw': '0',
                'for': '12',
                'goal_difference': '-6',
                'lose': '3',
                'played': '5',
                'points': '6',
                'win': '2'
            },
            {
                'division': '3se',
                'id': 'Redbridge &Ilford 1',
                'against': '8',
                'draw': '0',
                'for': '14',
                'goal_difference': '6',
                'lose': '2',
                'played': '5',
                'points': '9',
                'win': '3'
            },
            {
                'division': '3se',
                'id': 'Southend 1',
                'against': '11',
                'draw': '3',
                'for': '13',
                'goal_difference': '2',
                'lose': '1',
                'played': '5',
                'points': '6',
                'win': '1'
            },
            {
                'division': '3se',
                'id': 'Upminster 2',
                'against': '11',
                'draw': '2',
                'for': '11',
                'goal_difference': '0',
                'lose': '1',
                'played': '5',
                'points': '8',
                'win': '2'
            },
            {
                'division': '3se',
                'id': 'Wapping 5',
                'against': '6',
                'draw': '1',
                'for': '22',
                'goal_difference': '16',
                'lose': '0',
                'played': '5',
                'points': '13',
                'win': '4'
            },
            {
                'division': '3se',
                'id': 'Wapping 6',
                'against': '11',
                'draw': '2',
                'for': '10',
                'goal_difference': '-1',
                'lose': '2',
                'played': '5',
                'points': '5',
                'win': '1',
            }
        ];
    });
    afterEach(function () {
        sandbox.restore();
    });
    describe('getters setters', function () {
        it('can set and get the league table to use', function () {
            prediction.setLeagueTable(league_table);
            expect(prediction.getLeagueTable()).to.equal(league_table);
        });
        it('can set and get the fixtures table to use', function () {
            prediction.setFixtureList(fixture_list);
            expect(prediction.getFixtureList()).to.equal(fixture_list);
        });
        it('can set and get the team performance data', function () {
            prediction.setLeagueTable(league_table);
            prediction.setTeamPerformanceData();
            expect(prediction.getTeamPerformanceData()).to.deep.equal(team_performance_data);
        });
    });
    describe('finders', function () {
        beforeEach(function () {
            prediction.setLeagueTable(league_table);
            prediction.setFixtureList(fixture_list);
        });
        it('can find the division for a team so that we can look at the fixtures or performance', function () {
            expect(prediction.getDivisionFor('Chelmsford 7')).to.equal('10se');
            expect(prediction.getDivisionFor('Braintree 1')).to.not.equal('10se');
        });
        it('can find next fixtures for a team', function () {
            expect(prediction.getNextFixtureFor('29-Nov-18', 'Chelmsford 7')).to.deep.equal(
                {
                    'home_team': 'Chelmsford 7',
                    'away_team': 'Old Loughts Willows 2'
                }
            );
        });
        it('can lookup any given league standing property for a prediction', function () {
            let fixture = {
                'home_team': 'Chelmsford 7',
                'away_team': 'Old Loughts Willows 2'
            };
            expect(prediction.getPerformanceProperty(fixture, 'goal_difference')).to.deep.equal(
                {
                    'Chelmsford 7': '7',
                    'Old Loughts Willows 2': '3'
                }
            );
            expect(prediction.getPerformanceProperty(fixture, 'against')).to.deep.equal(
                {
                    'Chelmsford 7': '3',
                    'Old Loughts Willows 2': '4'
                }
            );
            expect(prediction.getPerformanceProperty(fixture, 'for')).to.deep.equal(
                {
                    'Chelmsford 7': '10',
                    'Old Loughts Willows 2': '7'
                }
            );
        });
    });
    describe('the team performance', function () {
        it('should transpose the league object into an array of team performance objects', function () {
            prediction.setLeagueTable(league_table);
            expect(prediction.constructTeamPerformanceData()).to.deep.equal(team_performance_data);
        });
    });
});