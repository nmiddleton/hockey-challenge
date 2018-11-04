import {TeamPerformance} from "./team-performance";

export class TeamPrediction {
  performance: TeamPerformance;
  team: string;
  str_league: number;
  str_defence: number;
  str_offence: number;
  oppo_defence: number;
  oppo_offence: number;

  constructor(team_performance: TeamPerformance, team: string, strength_league: number, strength_defence: number, strength_offence: number, oppo_defence: number, oppo_offence: number)  {
    this.performance = team_performance;
    this.team = team;
    this.str_league = strength_league;
    this.str_defence = strength_defence;
    this.str_offence = strength_offence;
    this.oppo_defence = oppo_defence;
    this.oppo_offence = oppo_offence;
  }

}
