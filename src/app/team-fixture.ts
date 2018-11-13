export class TeamFixture {
  id: string;
  home_team: string;
  away_team: string;

  constructor(id: string, home_team: string, away_team: string) {
    this.id = id;
    this.home_team = home_team;
    this.away_team = away_team;
  }
}
