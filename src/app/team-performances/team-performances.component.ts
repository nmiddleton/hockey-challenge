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
  predictions_last_updated: string;

  constructor(private teamPerformanceService: TeamPerformanceService) {}

  @Output() teamPredictionEmitter = new EventEmitter<TeamPerformance[]>();

  ngOnInit() {
    // Refresh performances from source with POST to /performances
    this.refreshTeamPerformances()
  }

  handleTeamFilterChanged(event) {
    // get the teams matching this
    this.filtered_team_performances$ = this.teamPerformanceService.getTeamPerformancesFor(event);
    this.team_filter_changed_to = event.toUpperCase();
    this.filtered_team_performances$.subscribe(filtered_team_performances => {
      this.filtered_team_performances = filtered_team_performances;
    });
  }

  refreshTeamPerformances() {
    this.teamPerformanceService.refreshTeamPerformance().subscribe(team_performances => {
      team_performances.forEach((performances_metadata) => {
        if (performances_metadata.hasOwnProperty('timestamp')) {
          this.predictions_last_updated = performances_metadata['timestamp']
        }
      })
      this.getTeamPerformances()
    })
  }

  getTeamPerformances() {
    // returns an Observable array of TeamPerformance
    this.all_team_performances$ = this.teamPerformanceService.getTeamPerformance();
  }

  getTeamPredictions() {
    this.teamPredictionEmitter.emit(this.filtered_team_performances);
  }
}
