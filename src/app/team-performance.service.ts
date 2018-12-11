import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {TeamPerformance} from './team-performance';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ServiceHelpers} from './service-helpers';


const PERFORMANCES_API_URL = environment.performancesApiURL

@Injectable({
  providedIn: 'root'
})
export class TeamPerformanceService {

  constructor(
    private http: HttpClient) { }

  public getTeamPerformance(): Observable<TeamPerformance[]> {
    return this.http.get<TeamPerformance[]>(PERFORMANCES_API_URL + '/performances')
      .pipe(
        catchError(ServiceHelpers.handleErrorAndContinue('get team_performance', []))
      );
  }

  public getTeamPerformancesFor(team_partial: string): Observable<TeamPerformance[]> {
    return this.http.get<any>(PERFORMANCES_API_URL + '/performances/' + team_partial)
      .pipe(
        catchError(ServiceHelpers.handleErrorAndContinue('get matching team_performances for ' + team_partial, []))
      );
  }

  public getTeamPerformanceFor(team?: string): Observable<TeamPerformance> {
    return this.http.get<any>(PERFORMANCES_API_URL + '/performance/' + team)
      .pipe(
        catchError(ServiceHelpers.handleErrorAndContinue('get team_performance for ' + team, []))
      );
  }
}
