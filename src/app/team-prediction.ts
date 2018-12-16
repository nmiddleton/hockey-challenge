import {TeamPerformance} from './team-performance';

export class TeamPrediction {
  performance: TeamPerformance;
  team: string;
  gender: string;
  str_league: number;
  str_defence: number;
  str_offence: number;
  oppo_team: string;
  oppo_league: number;
  oppo_defence: number;
  oppo_offence: number;
  score_def: number;
  score_off: number;
  score_total: number;
  home_or_away: string;

  constructor(team_performance: TeamPerformance,
              team: string,
              gender: string,
              strength_league: number,
              strength_defence: number,
              strength_offence: number,
              oppo_team: string,
              oppo_league: number,
              oppo_defence: number,
              oppo_offence: number,
              score_def: number,
              score_off: number,
              score_total: number,
              home_or_away: string) {
    this.performance = team_performance;
    this.team = team;
    this.gender = gender;
    this.str_league = strength_league;
    this.str_defence = strength_defence;
    this.str_offence = strength_offence;
    this.oppo_team = oppo_team;
    this.oppo_league = oppo_league;
    this.oppo_defence = oppo_defence;
    this.oppo_offence = oppo_offence;
    this.score_def = score_def;
    this.score_off = score_off;
    this.score_total = score_total;
    this.home_or_away = home_or_away;
  }

}
