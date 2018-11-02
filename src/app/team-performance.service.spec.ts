import { TestBed } from '@angular/core/testing';

import { TeamPerformanceService } from './team-performance.service';
import { HttpClientModule } from "@angular/common/http";

import { defer } from "rxjs";
import {TeamPerformance} from "./team-performance";

// Promisify a response
export function promisedResponseResolved<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
export function promisedResponseRejected<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('TeamPerformanceService', () => {
  let HttpClientResolvedSpy: { get: jasmine.Spy },
    HttpClientRejectedSpy: { get: jasmine.Spy },
    teamPerformanceServiceWithHTTPStub: TeamPerformanceService;
  const expectedTeamPerformances: TeamPerformance[] = [
    {
      played: '6',
      win: '6',
      draw: '0',
      lose: '0',
      for: '31',
      against: '7',
      goal_difference: '24',
      points: '18',
      division: '3se',
      id: 'Brentwood 1'
    },{
      played: '6',
      win: '5',
      draw: '1',
      lose: '0',
      for: '27',
      against: '7',
      goal_difference: '20',
      points: '16',
      division: '3se',
      id: 'Wapping 5'
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientModule ]});
    // stub out http
    HttpClientResolvedSpy = jasmine.createSpyObj('HttpClient', ['get']);
    HttpClientRejectedSpy = jasmine.createSpyObj('HttpClient', ['get']);
    HttpClientResolvedSpy.get.and.returnValue(promisedResponseResolved(expectedTeamPerformances));
    HttpClientRejectedSpy.get.and.returnValue(promisedResponseRejected({status: 500, message: 'Something broke'}));

  });

  it('should be created', () => {
    const service: TeamPerformanceService = TestBed.get(TeamPerformanceService);
    expect(service).toBeTruthy();
  });
  it('retrieves all of the team performances', (done: DoneFn) => {
    // inject into service constructor
    teamPerformanceServiceWithHTTPStub = new TeamPerformanceService(<any> HttpClientResolvedSpy);
    teamPerformanceServiceWithHTTPStub.getTeamPerformance().subscribe(result => {
      expect(result).toBe(expectedTeamPerformances);
      done();
    });
  });
  it('continues to pass through if the team performance call fails but increments an error count', (done: DoneFn) => {
    // inject into service constructor
    teamPerformanceServiceWithHTTPStub = new TeamPerformanceService(<any> HttpClientRejectedSpy);
    teamPerformanceServiceWithHTTPStub.getTeamPerformance().subscribe(result => {
      expect(teamPerformanceServiceWithHTTPStub.error_count).toEqual(1);
      expect(result).toEqual([]);
      done();
    });
  });
});
