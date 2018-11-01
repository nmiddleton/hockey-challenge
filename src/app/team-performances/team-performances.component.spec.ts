import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPerformancesComponent } from './team-performances.component';
import { HttpClientModule } from "@angular/common/http";

describe('TeamPerformancesComponent', () => {
  let component: TeamPerformancesComponent;
  let fixture: ComponentFixture<TeamPerformancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPerformancesComponent ],
      imports: [ HttpClientModule ]
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
});
