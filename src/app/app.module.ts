import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamPerformanceService } from './team-performance.service';
import { TeamPerformancesComponent } from './team-performances/team-performances.component';
import { TeamFilterComponent } from './team-filter/team-filter.component';
import { TeamPredictionComponent } from './team-prediction/team-prediction.component';
import {LeagueFixturesService} from "./league-fixtures.service";

@NgModule({
  declarations: [
    AppComponent,
    TeamPerformancesComponent,
    TeamFilterComponent,
    TeamPredictionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    TeamPerformanceService,
    LeagueFixturesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
