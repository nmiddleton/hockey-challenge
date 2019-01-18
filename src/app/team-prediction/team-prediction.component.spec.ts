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

  describe('prediction functions', () => {
    const team_performance = new TeamPerformance('M:Brentwood 1',
      'se03','Brentwood 1', 'M','6', '6', '0', '0',
      '31', '7', '24', '18'),
    team = 'Brentwood 1',
    oppo = 'Chelmsford 1',
    oppo_date = '1-Jan-1971',
      oppo_team_performance = new TeamPerformance('M:Chelmsford 1',
        'se03', 'Chelmsford 1','M','6', '4', '0', '2',
        '17', '7', '10', '12');
    it('should create the expected team prediction class', () => {
      const expected_team_prediction = new TeamPrediction(team_performance, team, 'M',3, 1, 6, oppo, oppo_date, 2, 1, 3, 1, 2, 3, 'Home');
      expect(expected_team_prediction.team).toEqual(team);
      expect(expected_team_prediction.gender).toEqual('M');
      expect(expected_team_prediction.str_league).toEqual(3);
      expect(expected_team_prediction.str_defence).toEqual(1);
      expect(expected_team_prediction.str_offence).toEqual(6);
      expect(expected_team_prediction.oppo_team).toEqual(oppo);
      expect(expected_team_prediction.oppo_date).toEqual(oppo_date);
      expect(expected_team_prediction.oppo_league).toEqual(2);
      expect(expected_team_prediction.oppo_defence).toEqual(1);
      expect(expected_team_prediction.oppo_offence).toEqual(3);
      expect(expected_team_prediction.score_def).toEqual(1);
      expect(expected_team_prediction.score_off).toEqual(2);
      expect(expected_team_prediction.score_total).toEqual(3);
      expect(expected_team_prediction.home_or_away).toEqual('Home');
    });
    it('getLeagueStrength', () => {
      expect(component.getLeagueStrength(team_performance)).toEqual(3.0);
    });
    it('getDefensiveWeakness', () => {
      expect(component.getDefensiveWeakness(team_performance)).toEqual(1.2);
    });
    it('getOffensiveStrength', () => {
      expect(component.getOffensiveStrength(oppo_team_performance)).toEqual(2.8);
    });
  });
});
