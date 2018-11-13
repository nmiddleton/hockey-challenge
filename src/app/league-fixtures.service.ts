import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ServiceHelpers} from './service-helpers';
import {environment} from '../environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class LeagueFixturesService {


  constructor(
    private http: HttpClient) {
  }

  public getFixtureList(): Observable<any> {
    return this.http.get<string>(API_URL + '/league_fixtures')
      .pipe(
        catchError(ServiceHelpers.handleErrorAndContinue('get league_fixtures', []))
      );
  }

  public getFixtureListFor(team: string): Observable<any> {
    return this.http.get<string>(API_URL + '/league_fixtures/' + team)
      .pipe(
        catchError(ServiceHelpers.handleErrorAndContinue('get league_fixtures/' + team, []))
      );
  }
}
