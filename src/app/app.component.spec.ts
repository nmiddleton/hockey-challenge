import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TeamPerformancesComponent} from './team-performances/team-performances.component';
import {HttpClientModule} from '@angular/common/http';
import {TeamFilterComponent} from './team-filter/team-filter.component';
import {TeamPredictionComponent} from './team-prediction/team-prediction.component';
import {StarRatingComponent} from "./star-rating/star-rating.component";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        NgbModule
      ],
      declarations: [
        AppComponent,
        TeamPerformancesComponent,
        TeamFilterComponent,
        TeamPredictionComponent,
        StarRatingComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'hockey-challenge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('hockey-challenge');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to hockey-challenge!');
  });
});
