import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {LeaderboardComponent} from './dashboard/components/leaderboard/leaderboard.component';
import {HomeComponent} from './dashboard/components/home/home.component';
import {LandingComponent} from './homepage/components/landing/landing.component';
import {IdeasComponent} from './dashboard/components/ideas/ideas.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RegisterComponent} from './dashboard/components/register/register.component';
import {TncComponent} from './dashboard/components/register/tnc/tnc.component';
import {AuthGuard, guards, LocalUserGuard, LoggedInGuard, RegisteredUserGuard} from './guards';

const routes: Routes = [
  {path: 'landing', component: LandingComponent, canActivate: [LoggedInGuard]},
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [LocalUserGuard], canLoad: [AuthGuard], children: [
      {path: '', redirectTo: 'home', pathMatch: 'prefix'},
      {path: 'leaderboard', component: LeaderboardComponent, canActivate: [RegisteredUserGuard]},
      {path: 'ideas', component: IdeasComponent, canActivate: [RegisteredUserGuard]},
      {path: 'home', component: HomeComponent, canActivate: [RegisteredUserGuard]},
      {path: 'register', component: RegisterComponent},
      {path: 'register/tnc', component: TncComponent},
    ]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [guards],
  declarations: []
})
export class AppRoutingModule {
}
