import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
   path:'',
   redirectTo:'/signup',
   pathMatch:'full'
  },
  {  
    path: 'signup',
    loadChildren: () => import('./Components/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'Dashboard',
    loadChildren: () => import('./Components/dashboard/dashboard.module').then(m => m.DashboardModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
