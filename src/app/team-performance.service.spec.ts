import { TestBed } from '@angular/core/testing';

import { TeamPerformanceService } from './team-performance.service';
import { HttpClientModule } from "@angular/common/http";

import { defer } from "rxjs";
import {TeamPerformance} from "./team-performance";

// Promisify a response
export function promisedResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('TeamPerformanceService', () => {
  let HttpClientSpy: { get: jasmine.Spy },
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
    HttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    HttpClientSpy.get.and.returnValue(promisedResponse(expectedTeamPerformances));
    // inject into service constructor
    teamPerformanceServiceWithHTTPStub = new TeamPerformanceService(<any> HttpClientSpy)
  });

  it('should be created', () => {
    const service: TeamPerformanceService = TestBed.get(TeamPerformanceService);
    expect(service).toBeTruthy();
  });
  it(' retrieves all of the team performances', () => {
    teamPerformanceServiceWithHTTPStub.getTeamPerformance().subscribe(result => {
      expect(result).toEqual(expectedTeamPerformances);
    });
  });
});
