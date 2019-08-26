import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrillMasterComponent } from './components/grill-master/grill-master.component';

const routes: Routes = [
    {
        path: '', component: GrillMasterComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrillRoutingModule { }
