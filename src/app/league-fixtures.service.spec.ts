import {TestBed} from '@angular/core/testing';

import {LeagueFixturesService} from './league-fixtures.service';
import {HttpClientModule} from '@angular/common/http';
import {defer} from 'rxjs';

// Promisify a response
export function promisedResponseResolved<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function promisedResponseRejected<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}


describe('LeagueFixturesService', () => {
  let HttpClientResolvedSpy: { get: jasmine.Spy },
    HttpClientRejectedSpy: { get: jasmine.Spy },
    LeagueFixturesServiceWithHTTPStub: LeagueFixturesService;
  const expectedFixtureList = {
      '3se': {
        '24-Nov-18': [{'home_team': 'Wapping 5', 'away_team': 'Maldon 1'}, {
          'home_team': 'Braintree 1',
          'away_team': 'Brentwood 1'
        }, {'home_team': 'Southend 1', 'away_team': 'East London 3'}, {
          'home_team': 'Redbridge & Ilford 1',
          'away_team': 'Crostyx 2'
        }, {'home_team': 'Clacton 1', 'away_team': 'Upminster 2'}, {
          'home_team': 'Brentwood 2',
          'away_team': 'Wapping 6'
        }],
        '01-Dec-18': [{'home_team': 'Brentwood 1', 'away_team': 'Wapping 5'}, {
          'home_team': 'Maldon 1',
          'away_team': 'Brentwood 2'
        }, {'home_team': 'East London 3', 'away_team': 'Braintree 1'}, {
          'home_team': 'Crostyx 2',
          'away_team': 'Southend 1'
        }, {'home_team': 'Upminster 2', 'away_team': 'Redbridge & Ilford 1'}, {
          'home_team': 'Wapping 6',
          'away_team': 'Clacton 1'
        }],
        '08-Dec-18': [{'home_team': 'Maldon 1', 'away_team': 'Brentwood 1'}, {
          'home_team': 'East London 3',
          'away_team': 'Wapping 5'
        }, {'home_team': 'Crostyx 2', 'away_team': 'Braintree 1'}, {
          'home_team': 'Upminster 2',
          'away_team': 'Southend 1'
        }, {'home_team': 'Wapping 6', 'away_team': 'Redbridge & Ilford 1'}, {
          'home_team': 'Brentwood 2',
          'away_team': 'Clacton 1'
        }],
        '15-Dec-18': [],
        '22-Dec-18': [],
        '29-Dec-18': [],
        '05-Jan-19': []
      }
    },
    expectedFixtureListFor = {
      id: 'Brentwood 1',
      home_team: 'Brentwood 1',
      away_team: 'Wapping 5'
    };

  beforeEach(() => {
      TestBed.configureTestingModule({imports: [HttpClientModule]});
      // stub out http
      HttpClientResolvedSpy = jasmine.createSpyObj('HttpClient', ['get']);
      HttpClientRejectedSpy = jasmine.createSpyObj('HttpClient', ['get']);
      HttpClientResolvedSpy.get.and.returnValue(promisedResponseResolved(expectedFixtureList));
      HttpClientRejectedSpy.get.and.returnValue(promisedResponseRejected({status: 500, message: 'Something broke'}));
      // inject into service constructor
    }
  )
  ;

  it('should be created', () => {
    const service: LeagueFixturesService = TestBed.get(LeagueFixturesService);
    expect(service).toBeTruthy();
  });
  it('retrieves all of the fixtures', (done: DoneFn) => {
    LeagueFixturesServiceWithHTTPStub = new LeagueFixturesService(<any> HttpClientResolvedSpy);
    LeagueFixturesServiceWithHTTPStub.getFixtureList().subscribe(result => {
      expect(result).toBe(expectedFixtureList);
      done();
    });
  });
  it('continues to pass through if the fixtures call fails', (done: DoneFn) => {
    LeagueFixturesServiceWithHTTPStub = new LeagueFixturesService(<any> HttpClientRejectedSpy);
    LeagueFixturesServiceWithHTTPStub.getFixtureList().subscribe(result => {
      expect(result).toEqual([]);
      done();
    });
  });
  it('retrieves next fixture for a given team', (done: DoneFn) => {
    LeagueFixturesServiceWithHTTPStub = new LeagueFixturesService(<any> HttpClientResolvedSpy);
    HttpClientResolvedSpy.get.and.returnValue(promisedResponseResolved(expectedFixtureListFor));
    HttpClientRejectedSpy.get.and.returnValue(promisedResponseRejected({status: 500, message: 'Something broke'}));
    LeagueFixturesServiceWithHTTPStub.getFixtureListFor('Brentwood 1').subscribe(result => {
      expect(result).toBe(expectedFixtureListFor);
      done();
    });
  });
});
