import { Routes } from '@angular/router';

import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'heroes-list',
    component: HeroesListComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
