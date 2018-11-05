import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {TeamPerformance} from "../team-performance";
import {TeamPerformanceService} from "../team-performance.service";

import { Observable} from "rxjs";

@Component({
  selector: 'app-team-performances',
  templateUrl: './team-performances.component.html',
  styleUrls: ['./team-performances.component.scss']
})
export class TeamPerformancesComponent implements OnInit {
  public filtered_team_performances: TeamPerformance[];
  team_filter_changed_to: string;
  all_team_performances$: Observable<TeamPerformance[]>;

  constructor(private teamPerformanceService: TeamPerformanceService) {}
  ngOnInit() {
    this.getTeamPerformances();
  }

  handleTeamFilterChanged(event) {
    // get the teams matching this
    this.team_filter_changed_to = event.toUpperCase();
    this.all_team_performances$.subscribe(team_performances => {
      this.filtered_team_performances = team_performances.filter((team_performance: TeamPerformance) => {
        return this.team_filter_changed_to ? team_performance.id.toUpperCase().startsWith(this.team_filter_changed_to, 0) : team_performance.id;
      })
    });
  }

  getTeamPerformances() {
    // returns an Observable array of TeamPerformance
    this.all_team_performances$ = this.teamPerformanceService.getTeamPerformance();
  }
  @Output() teamPredictionEmitter = new EventEmitter<TeamPerformance[]>();

  getTeamPredictions(){
    this.teamPredictionEmitter.emit(this.filtered_team_performances);
  }
}
