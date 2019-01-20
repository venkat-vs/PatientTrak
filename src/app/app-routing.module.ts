import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '#', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: DashboardComponent },
  { path: 'map', component: MapComponent },
];

@NgModule({
  declarations:[],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],
  imports: [CommonModule, RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

