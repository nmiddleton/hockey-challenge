import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSearchComponent } from './team-search.component';

describe('TeamSearchComponent', () => {
  let component: TeamSearchComponent;
  let fixture: ComponentFixture<TeamSearchComponent>;
  let team_list_items =   [
    {
      team: 'Chelmsford 2',
      g_against: '9',
      g_for: '13',
      g_difference: '4'
    },
    {
      team: 'Chelmsford 7',
      g_difference: '7',
      g_against: '3',
      g_for: '10'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a TeamListItems property with a getter and setter', () => {
    component.setTeamListItems(team_list_items);
    expect(component.TeamListItems).toEqual(team_list_items);
    expect(component.getTeamListItems).toBeDefined(team_list_items);
  });
});
