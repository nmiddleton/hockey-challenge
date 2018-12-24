import {Component, OnInit} from '@angular/core';
import {TeamPrediction} from '../team-prediction';
import {TeamPerformance} from '../team-performance';
import {LeagueFixturesService} from '../league-fixtures.service';
import {TeamPerformanceService} from '../team-performance.service';
import {Observable} from 'rxjs';
import {TeamFixture} from '../team-fixture';

@Component({
  selector: 'app-team-prediction',
  templateUrl: './team-prediction.component.html',
  styleUrls: ['./team-prediction.component.scss']
})
export class TeamPredictionComponent implements OnInit {
  filtered_team_performances: TeamPerformance[];
  filtered_team_predictions: TeamPrediction[];
  next_team_fixture$: Observable<TeamFixture>;
  oppo_team_performance$: Observable<TeamPerformance>;
  fixtures_last_updated: string;

  constructor(private leagueFixturesService: LeagueFixturesService, private teamPerformanceService: TeamPerformanceService) {
    this.filtered_team_predictions = [];

  }

  ngOnInit() {
    // Refresh fixtures from source with POST to /fixtures
    this.leagueFixturesService.refreshFixtures().subscribe((fixtures) => {
        fixtures.forEach((fixtures_metadata) => {
          if (fixtures_metadata.hasOwnProperty('_id') && fixtures_metadata['_id'] === 'last_refreshed') {
            this.fixtures_last_updated = fixtures_metadata['timestamp']
          }
        })
      })
  }

  getLeagueStrength(team_performance: TeamPerformance) {
    return Math.round((parseInt(team_performance.points, 10) / parseInt(team_performance.played, 10)) * 10) / 10;
  }

  getDefensiveWeakness(team_performance: TeamPerformance) {
    return Math.round((parseInt(team_performance.against, 10) / parseInt(team_performance.played, 10)) * 10) / 10;
  }

  getOffensiveStrength(team_performance: TeamPerformance) {
    return Math.round((parseInt(team_performance.for, 10) / parseInt(team_performance.played, 10)) * 10) / 10;
  }

  getNextFixture(team: string, gender: string) {
    this.next_team_fixture$ = this.leagueFixturesService.getNextFixtureFor(team, gender);
  }

  getOppoTeamPerformance(team: string) {
    this.oppo_team_performance$ = this.teamPerformanceService.getTeamPerformanceFor(team);
  }

  makePredictions(event) {
    this.filtered_team_predictions = [];
    this.filtered_team_performances = event;

    event.forEach((team_performance) => {
        this.getNextFixture(team_performance.team, team_performance.gender);
        this.next_team_fixture$.subscribe(team_fixture => {
          const oppo_team = team_performance.team === team_fixture.home_team ? team_fixture.away_team : team_fixture.home_team;
          const home_fixture_bonus = team_performance.team === team_fixture.home_team ? 1 : 0;
          this.getOppoTeamPerformance(oppo_team);
          this.oppo_team_performance$.subscribe((oppo_team_performance) => {
            this.filtered_team_predictions.push(new TeamPrediction(
              team_performance,
              team_performance.team,
              team_performance.gender,
              this.getLeagueStrength(team_performance),
              this.getDefensiveWeakness(team_performance),
              this.getOffensiveStrength(team_performance),
              oppo_team,
              this.getLeagueStrength(oppo_team_performance),
              this.getDefensiveWeakness(oppo_team_performance),
              this.getOffensiveStrength(oppo_team_performance),
              Math.round((this.getDefensiveWeakness(team_performance) +
                this.getOffensiveStrength(oppo_team_performance)) / 2) - home_fixture_bonus,
              Math.round((this.getOffensiveStrength(team_performance) +
                this.getDefensiveWeakness(oppo_team_performance)) / 2) + home_fixture_bonus,
              parseFloat(((this.getOffensiveStrength(team_performance) + this.getDefensiveWeakness(oppo_team_performance)) / 2 + home_fixture_bonus - (this.getDefensiveWeakness(team_performance) + this.getOffensiveStrength(oppo_team_performance)) / 2 +
              this.getLeagueStrength(team_performance) - this.getLeagueStrength(oppo_team_performance)).toPrecision(3)),
              home_fixture_bonus === 1 ? 'Home' : 'Away'
            ));
            this.filtered_team_predictions.sort((team_prediction_a, team_prediction_b) => {
              let comparison = 0
              if (team_prediction_a.score_total > team_prediction_b.score_total){
                comparison = -1
              } else if (team_prediction_a.score_total < team_prediction_b.score_total ){
                comparison = 1
              }
              return comparison
            })
          });
        });
      }
    );
  }
}
