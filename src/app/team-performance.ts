export class TeamPerformance {
  id: string;
  division: string;
  team: string;
  gender: string;
  played: string;
  win: string;
  draw: string;
  lose: string;
  for: string;
  against: string;
  goal_difference: string;
  points: string;

  constructor(
    id: string,
    division: string,
    team: string,
    gender: string,
    played: string,
    win: string,
    draw: string,
    lose: string,
    gfor: string,
    gagainst: string,
    goal_difference: string,
    points: string
  ) {
    this.id = id;
    this.division = division;
    this.team = team;
    this.gender = gender;
    this.played = played;
    this.win = win;
    this.draw = draw;
    this.lose = lose;
    this.for = gfor;
    this.against = gagainst;
    this.goal_difference = goal_difference;
    this.points = points;
  }


}
