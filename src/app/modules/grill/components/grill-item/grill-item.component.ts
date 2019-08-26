import { Component, Input } from '@angular/core';

@Component({
  selector: 'grill-item',
  templateUrl: './grill-item.component.html',
  styleUrls: ['./grill-item.component.scss']
})
export class GrillItemComponent {

    @Input()
    private grillItem: any = null;
}
