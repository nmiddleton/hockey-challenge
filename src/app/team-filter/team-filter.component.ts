import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-team-filter',
  templateUrl: './team-filter.component.html',
  styleUrls: ['./team-filter.component.scss']
})
export class TeamFilterComponent implements OnInit {
  @Output() teamFilterChangedEmitter = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  setFilter(team_starts_with: string) {
    this.teamFilterChangedEmitter.emit(team_starts_with);
  }
}
