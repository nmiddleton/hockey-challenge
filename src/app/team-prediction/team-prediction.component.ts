import { Component, OnInit } from '@angular/core';
import {TeamPrediction} from "../team-prediction";
import {TeamPerformance} from "../team-performance";

@Component({
  selector: 'app-team-prediction',
  templateUrl: './team-prediction.component.html',
  styleUrls: ['./team-prediction.component.scss']
})
export class TeamPredictionComponent implements OnInit {
  filtered_team_performances: TeamPerformance[];
  filtered_team_predictions: TeamPrediction[];



  constructor() { }

  ngOnInit() {
  }
  getLeagueStrength(team_performance: TeamPerformance) {
    return Math.round((parseInt(team_performance.points) / parseInt(team_performance.played)));
  }
  getDefensiveWeakness(team_performance: TeamPerformance){
    return Math.round((parseInt(team_performance.against) / parseInt(team_performance.played)));
  }
  getOffensiveStrength(team_performance: TeamPerformance){
    return Math.round((parseInt(team_performance.for) / parseInt(team_performance.played)));
  }
  getOppoDefenceWeakness(team_performance: TeamPerformance){
    return 2;

  }
  getOppoOffenceStrength(team_performance: TeamPerformance){
    return 2;
  }
  makePredictions(event){

    this.filtered_team_performances = event;
    this.filtered_team_predictions = event.map((team_performance: TeamPerformance) =>{

      return new TeamPrediction(
        team_performance,
        team_performance.id,
        this.getLeagueStrength(team_performance),
        this.getDefensiveWeakness(team_performance),
        this.getOffensiveStrength(team_performance),
        this.getOppoDefenceWeakness(team_performance),
        this.getOppoOffenceStrength(team_performance)
      )
    })
  }
}
