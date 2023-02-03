import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomescreenComponent } from '../User/homescreen/homescreen.component';
import { SearchComponent } from '../User/search/search.component';
import { WatchComponent } from '../User/watch/watch.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomescreenComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'watch',
        component: WatchComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
