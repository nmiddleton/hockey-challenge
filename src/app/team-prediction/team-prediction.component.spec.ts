import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPredictionComponent } from './team-prediction.component';
import {TeamPerformance} from "../team-performance";
import {TeamPerformancesComponent} from "../team-performances/team-performances.component";
import {TeamFilterComponent} from "../team-filter/team-filter.component";
import {HttpClientModule} from "@angular/common/http";

describe('TeamPredictionComponent', () => {
  let component: TeamPredictionComponent;
  let fixture: ComponentFixture<TeamPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPredictionComponent,
        TeamPerformancesComponent,
        TeamFilterComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('prediction functions', () => {
    let team_performance: TeamPerformance = {
      played: '6',
      win: '6',
      draw: '0',
      lose: '0',
      for: '31',
      against: '7',
      goal_difference: '24',
      points: '18',
      division: '3se',
      id: 'Brentwood 1'
    };
    it('getLeagueStrength', () =>{
      expect(component.getLeagueStrength(team_performance)).toEqual(3);
    });
    it('getDefensiveWeakness', () =>{
      expect(component.getDefensiveWeakness(team_performance)).toEqual(1);
    });
    it('getOffensiveStrength', () =>{
      expect(component.getOffensiveStrength(team_performance)).toEqual(5);
    });
  })
});
