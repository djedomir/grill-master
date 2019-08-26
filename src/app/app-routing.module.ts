import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

    {
      path: 'grill', loadChildren: () => import('./modules/grill/grill.module').then( mod => mod.GrillModule),
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
