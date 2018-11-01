import { Component, OnInit } from '@angular/core';

import { TeamPerformance} from "../team-performance";
import { TeamPerformanceService} from "../team-performance.service";

@Component({
  selector: 'app-team-performances',
  templateUrl: './team-performances.component.html',
  styleUrls: ['./team-performances.component.scss']
})
export class TeamPerformancesComponent implements OnInit {
  team_performances: TeamPerformance[];

  constructor(private teamPerformanceService: TeamPerformanceService) {}
  ngOnInit() {
    this.getTeamPerformances();
  }

  getTeamPerformances(): void {
    // returns an Observable array of TeamPerformance
    this.teamPerformanceService.getTeamPerformance()
      .subscribe(team_performances => this.team_performances = team_performances);
  }



}
