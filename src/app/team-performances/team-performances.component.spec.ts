import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPerformancesComponent } from './team-performances.component';
import { TeamFilterComponent } from '../team-filter/team-filter.component';
import { HttpClientModule } from '@angular/common/http';
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('TeamPerformancesComponent', () => {
  let component: TeamPerformancesComponent;
  let fixture: ComponentFixture<TeamPerformancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamPerformancesComponent,
        TeamFilterComponent,
        StarRatingComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPerformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('handles the team filter event change, setting this.team_filter_changed_to', () => {
    const event = 'New team searched..';
    component.handleTeamFilterChanged(event);
    expect(component.team_filter_changed_to).toBe(event.toUpperCase());
  });
});
