import { NgModule } from '@angular/core';
import { GrillRoutingModule } from './grill-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GrillMasterComponent } from './components/grill-master/grill-master.component';
import { GrillHeaderComponent } from './components/grill-header/grill-header.component';
import { GrillRoundComponent } from './components/grill-round/grill-round.component';
import { GrillItemComponent } from './components/grill-item/grill-item.component';

@NgModule({
  declarations: [
      GrillMasterComponent,
      GrillHeaderComponent,
      GrillRoundComponent,
      GrillItemComponent
  ],
  imports: [
      GrillRoutingModule,
      CommonModule,
      FormsModule
  ]
})
export class GrillModule { }
