import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // pathMatch: 'full'
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'all',
        component: HomeComponent
      },
      {
        path: 'pending',
        component: HomeComponent
      },
      {
        path: 'completed',
        component: HomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
