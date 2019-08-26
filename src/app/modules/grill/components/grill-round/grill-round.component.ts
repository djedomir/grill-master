import { Component, Input } from '@angular/core';

@Component({
  selector: 'grill-round',
  templateUrl: './grill-round.component.html',
  styleUrls: ['./grill-round.component.scss']
})
export class GrillRoundComponent {

    @Input()
    private grillRound: any = null;

}
