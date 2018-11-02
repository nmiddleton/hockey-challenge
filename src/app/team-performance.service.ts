import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {TeamPerformance} from "./team-performance";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";


const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class TeamPerformanceService {
  error_count: number = 0;

  constructor(
    private http: HttpClient) { }

  public getTeamPerformance(): Observable<TeamPerformance[]> {
    return this.http.get<TeamPerformance[]>(API_URL + '/team_performance')
      .pipe(
        catchError(this.handleError('get team_performance', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    this.error_count++;
    return (error: any): Observable<T> => {
      console.error(operation, 'failed', error); // log to console for now

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
