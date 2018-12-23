import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ServiceHelpers} from './service-helpers';
import {environment} from '../environments/environment';
import {TeamFixture} from "./team-fixture";

const FIXTURES_API_URL = environment.fixturesApiURL

@Injectable({
  providedIn: 'root'
})
export class LeagueFixturesService {

  constructor(
    private http: HttpClient) {
  }

  public refreshFixtures(): Observable<TeamFixture[]> {
    return this.http.post<TeamFixture[]>(FIXTURES_API_URL + '/fixtures',null, {})
      .pipe(
        catchError(ServiceHelpers.handleErrorAndContinue('refresh fixtures from source', []))
      );
  }
  public getFixtures(): Observable<any> {
    return this.http.get<string>(FIXTURES_API_URL + '/fixtures')
      .pipe(
        catchError(ServiceHelpers.handleErrorAndContinue('get /fixtures', []))
      );
  }

  public getFixturesCollectionFor(team: string): Observable<any> {
    return this.http.get<string>(FIXTURES_API_URL + '/fixtures/' + team)
      .pipe(
        catchError(ServiceHelpers.handleErrorAndContinue('get /fixtures/' + team, []))
      );
  }
  public getNextFixtureFor(team: string, gender: string): Observable<any> {
    return this.http.get<string>(FIXTURES_API_URL + '/next_fixture_for/' + team + (!!gender ? '?gender=' + gender : '') )
      .pipe(
        catchError(ServiceHelpers.handleErrorAndContinue('get /next_fixture_for/' + team +  (!!gender ? '?gender=' + gender : ''), []))
      );
  }
}
