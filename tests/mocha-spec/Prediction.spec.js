const expect = require('chai').expect,
    sinon = require('sinon'),
    Prediction = require('../../src/app/Prediction');


describe('Predictions', function () {
    let sandbox,
        prediction,
        league_table,
        fixture_list;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        prediction = new Prediction();
        fixture_list = {
            '10se': {
                '1-Dec-18': [
                    {
                        'away_team': 'Chelmsford 7',
                        'home_team': 'Brentwood 4'
                    }
                ]
            }
        };
        league_table = {
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
            },
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
            }
        };
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
    });
});