import {Component, OnInit} from '@angular/core';
import {TeamPrediction} from "../team-prediction";
import {TeamPerformance} from "../team-performance";
import {LeagueFixturesService} from "../league-fixtures.service";
import {TeamPerformanceService} from "../team-performance.service";
import {Observable} from "rxjs";
import {TeamFixture} from "../team-fixture";

@Component({
  selector: 'app-team-prediction',
  templateUrl: './team-prediction.component.html',
  styleUrls: ['./team-prediction.component.scss']
})
export class TeamPredictionComponent implements OnInit {
  filtered_team_performances: TeamPerformance[];
  filtered_team_predictions: TeamPrediction[];
  filtered_team_fixture$: Observable<TeamFixture>;
  oppo_team_performance$: Observable<TeamPerformance>;


  constructor(private leagueFixturesService: LeagueFixturesService, private teamPerformanceService: TeamPerformanceService) {
    this.filtered_team_predictions = [];
  }

  ngOnInit() {
  }

  getLeagueStrength(team_performance: TeamPerformance) {
    return Math.round((parseInt(team_performance.points) / parseInt(team_performance.played)));
  }

  getDefensiveWeakness(team_performance: TeamPerformance) {
    return Math.round((parseInt(team_performance.against) / parseInt(team_performance.played)));
  }

  getOffensiveStrength(team_performance: TeamPerformance) {
    return Math.round((parseInt(team_performance.for) / parseInt(team_performance.played)));
  }

  getNextFixture(team: string) {
    this.filtered_team_fixture$ = this.leagueFixturesService.getFixtureListFor(team);
  }

  getOppoTeamPerformance(team: string) {
    this.oppo_team_performance$ = this.teamPerformanceService.getTeamPerformanceFor(team);
  }

  makePredictions(event) {
    this.filtered_team_predictions = [];
    this.filtered_team_performances = event;
    event.forEach(team_performance => {
        this.getNextFixture(team_performance.id);
        this.filtered_team_fixture$.subscribe(team_fixture => {
          let oppo_team = team_fixture.id === team_fixture.home_team ? team_fixture.away_team : team_fixture.home_team;
          let home_fixture_bonus = team_fixture.id === team_fixture.home_team ? 1 : 0;
          this.getOppoTeamPerformance(oppo_team);
          this.oppo_team_performance$.subscribe(oppo_team_performance => {
            this.filtered_team_predictions.push(new TeamPrediction(
              team_performance,
              team_performance.id,
              this.getLeagueStrength(team_performance),
              this.getDefensiveWeakness(team_performance),
              this.getOffensiveStrength(team_performance),
              oppo_team,
              this.getLeagueStrength(oppo_team_performance),
              this.getDefensiveWeakness(oppo_team_performance),
              this.getOffensiveStrength(oppo_team_performance),
              Math.round((this.getDefensiveWeakness(team_performance) + this.getOffensiveStrength(oppo_team_performance)) / 2) + home_fixture_bonus,
              Math.round((this.getOffensiveStrength(team_performance) + this.getDefensiveWeakness(oppo_team_performance)) / 2) + home_fixture_bonus,
              Math.round((this.getOffensiveStrength(team_performance) + this.getDefensiveWeakness(oppo_team_performance)) / 2) + home_fixture_bonus - Math.round((this.getDefensiveWeakness(team_performance) + this.getOffensiveStrength(oppo_team_performance)) / 2),
              home_fixture_bonus === 1 ? 'Home' : 'Away'
            ))
          })
        });
      }
    );
  }
}
