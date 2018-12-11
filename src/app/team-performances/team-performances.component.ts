import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {TeamPerformance} from '../team-performance';
import {TeamPerformanceService} from '../team-performance.service';

import { Observable} from 'rxjs';

@Component({
  selector: 'app-team-performances',
  templateUrl: './team-performances.component.html',
  styleUrls: ['./team-performances.component.scss']
})
export class TeamPerformancesComponent implements OnInit {
  public filtered_team_performances: TeamPerformance[];
  team_filter_changed_to: string;
  all_team_performances$: Observable<TeamPerformance[]>;
  filtered_team_performances$: Observable<TeamPerformance[]>;

  constructor(private teamPerformanceService: TeamPerformanceService) {}

  @Output() teamPredictionEmitter = new EventEmitter<TeamPerformance[]>();

  ngOnInit() {
    this.getTeamPerformances();
  }

  handleTeamFilterChanged(event) {
    // get the teams matching this
    this.filtered_team_performances$ = this.teamPerformanceService.getTeamPerformancesFor(event);
    this.team_filter_changed_to = event.toUpperCase();
    this.filtered_team_performances$.subscribe(filtered_team_performances => {
      this.filtered_team_performances = filtered_team_performances;
    });
  }

  getTeamPerformances() {
    // returns an Observable array of TeamPerformance
    this.all_team_performances$ = this.teamPerformanceService.getTeamPerformance();
  }

  getTeamPredictions() {
    this.teamPredictionEmitter.emit(this.filtered_team_performances);
  }
}
