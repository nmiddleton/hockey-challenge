import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamPerformanceService } from './team-performance.service';
import { TeamPerformancesComponent } from './team-performances/team-performances.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamPerformancesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TeamPerformanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
