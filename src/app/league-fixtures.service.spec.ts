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
  const expectedFixturesCollection = [{
      away_team: 'Basildon 1',
      division: '3se',
      fixture_date: '22-Sep-18',
      home_team: 'Maldon 2',
      _id: '22-Sep-18:Basildon 1'
    }, {
      away_team: 'Maldon 2',
      division: '3se',
      fixture_date: '29-Sep-18',
      home_team: 'Old Loughts Academy',
      _id: '29-Sep-18:Old Loughts Academy'
    }, {
      away_team: 'Maldon 2',
      division: '4se',
      fixture_date: '08-Dec-18',
      home_team: 'Basildon 1',
      _id: '08-Dec-18:Basildon 1'
    }, {
      away_team: 'Old Loughts Academy',
      division: '4se',
      fixture_date: '12-Jan-19',
      home_team: 'Maldon 2',
      _id: '12-Jan-19:Maldon 2'
    }],
    expectedFixturesCollectionFor = [
      {
        away_team: 'Maldon 2',
        division: '3se',
        fixture_date: '29-Sep-18',
        home_team: 'Old Loughts Academy',
        _id: '29-Sep-18:Old Loughts Academy'
      }, {
        away_team: 'Old Loughts Academy',
        division: '4se',
        fixture_date: '12-Jan-19',
        home_team: 'Maldon 2',
        _id: '12-Jan-19:Maldon 2'
      }];

  beforeEach(() => {
      TestBed.configureTestingModule({imports: [HttpClientModule]});
      // stub out http
      HttpClientResolvedSpy = jasmine.createSpyObj('HttpClient', ['get']);
      HttpClientRejectedSpy = jasmine.createSpyObj('HttpClient', ['get']);
      HttpClientRejectedSpy.get.and.returnValue(promisedResponseRejected({status: 500, message: 'Something broke'}));
      // inject into service constructor
    }
  );

  it('should be created', () => {
    const service: LeagueFixturesService = TestBed.get(LeagueFixturesService);
    expect(service).toBeTruthy();
  });
  describe('FixtureCollection - all fixtures as collection', () => {
    beforeEach(() => {
      HttpClientResolvedSpy.get.and.returnValue(promisedResponseResolved(expectedFixturesCollection));
    })

    it('retrieves all of the fixtures', (done: DoneFn) => {
      LeagueFixturesServiceWithHTTPStub = new LeagueFixturesService(<any> HttpClientResolvedSpy);
      LeagueFixturesServiceWithHTTPStub.getFixtures().subscribe(result => {
        expect(result).toBe(expectedFixturesCollection);
        done();
      });
    });
    it('continues to pass through if the fixtures call fails', (done: DoneFn) => {
      LeagueFixturesServiceWithHTTPStub = new LeagueFixturesService(<any> HttpClientRejectedSpy);
      LeagueFixturesServiceWithHTTPStub.getFixtures().subscribe(result => {
        expect(result).toEqual([]);
        done();
      });
    });
    it('retrieves fixtures as a collection for a given team', (done: DoneFn) => {
      LeagueFixturesServiceWithHTTPStub = new LeagueFixturesService(<any> HttpClientResolvedSpy);
      HttpClientResolvedSpy.get.and.returnValue(promisedResponseResolved(expectedFixturesCollectionFor));
      HttpClientRejectedSpy.get.and.returnValue(promisedResponseRejected({status: 500, message: 'Something broke'}));
      LeagueFixturesServiceWithHTTPStub.getFixturesCollectionFor('Brentwood 1').subscribe(result => {
        expect(result).toBe(expectedFixturesCollectionFor);
        done();
      });
    });
  })

});
