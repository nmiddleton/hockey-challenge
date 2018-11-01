import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { TeamPerformance} from "./team-performance";
import {Observable} from "rxjs";
import { HttpClient} from "@angular/common/http";


const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class TeamPerformanceService {

  constructor(
    private http: HttpClient) { }

  public getTeamPerformance(): Observable<TeamPerformance[]> {
    return this.http.get<TeamPerformance[]>(API_URL + '/team_performance');
  }
}
