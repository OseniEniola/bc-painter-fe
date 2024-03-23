import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./static/not-found/not-found.component";

const routes: Routes = [
  {
    path         : 'home',
    loadChildren : () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path         : 'app',
    loadChildren : () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  { path : '',   redirectTo : '/home', pathMatch : 'full' },
  { path : '**', component : NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
