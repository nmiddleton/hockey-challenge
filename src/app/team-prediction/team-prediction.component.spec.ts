import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamPredictionComponent} from './team-prediction.component';
import {TeamPerformance} from '../team-performance';
import {TeamPerformancesComponent} from '../team-performances/team-performances.component';
import {TeamFilterComponent} from '../team-filter/team-filter.component';
import {HttpClientModule} from '@angular/common/http';
import {TeamPrediction} from '../team-prediction';

describe('TeamPredictionComponent', () => {
  let component: TeamPredictionComponent;
  let fixture: ComponentFixture<TeamPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamPredictionComponent,
        TeamPerformancesComponent,
        TeamFilterComponent],
      imports: [HttpClientModule]
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
  describe('team prediction class', () => {

  });

  describe('prediction functions', () => {
    const team_performance: TeamPerformance = {
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
      },
    team = 'Brentwood 1',
    oppo = 'Chelmsford 1';
    it('should create the expected team prediction class', () => {
      const expected_team_prediction = new TeamPrediction(team_performance, team, 3, 1, 6, oppo, 2, 1, 3, 1, 2, 3, 'Home');
      expect(expected_team_prediction.team).toEqual(team);
      expect(expected_team_prediction.str_league).toEqual(3);
      expect(expected_team_prediction.str_defence).toEqual(1);
      expect(expected_team_prediction.str_offence).toEqual(6);
      expect(expected_team_prediction.oppo_team).toEqual(oppo);
      expect(expected_team_prediction.oppo_league).toEqual(2);
      expect(expected_team_prediction.oppo_defence).toEqual(1);
      expect(expected_team_prediction.oppo_offence).toEqual(3);
      expect(expected_team_prediction.score_def).toEqual(1);
      expect(expected_team_prediction.score_off).toEqual(2);
      expect(expected_team_prediction.score_total).toEqual(3);
      expect(expected_team_prediction.home_or_away).toEqual('Home');
    });
    it('getLeagueStrength', () => {
      expect(component.getLeagueStrength(team_performance)).toEqual(3);
    });
    it('getDefensiveWeakness', () => {
      expect(component.getDefensiveWeakness(team_performance)).toEqual(1);
    });
    it('getOffensiveStrength', () => {
      expect(component.getOffensiveStrength(team_performance)).toEqual(5);
    });
  });
});
