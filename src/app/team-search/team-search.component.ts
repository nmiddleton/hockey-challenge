import { Component, OnInit } from '@angular/core';
import { Team } from '../team'
// TODO: remove mock
import { TEAMS } from '../mock-teams'

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.scss']
})
export class TeamSearchComponent implements OnInit {
  TeamListItems: Team[];

  constructor() {
    // TODO: remove mock
    this.setTeamListItems(TEAMS);
  }

  setTeamListItems(team_list_items) {
    this.TeamListItems = team_list_items;
  }

  getTeamListItems() {
    return this.TeamListItems;
  }

  ngOnInit() {
  }

}
