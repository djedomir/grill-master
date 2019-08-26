import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'grill-header',
  templateUrl: './grill-header.component.html',
  styleUrls: ['./grill-header.component.scss']
})
export class GrillHeaderComponent implements OnChanges {

    @Input()
    private grillRounds: any[] = [];

    @Output()
    public onCurrentRoundChanged: EventEmitter<any> = new EventEmitter<any>();

    private currentRound: any = null;
    
    private currentRoundIndex: number = 0;
    
    constructor() {
        this.currentRound = this.grillRounds[0];
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) { 
            if (propName === 'grillRounds') {
                this.currentRoundIndex = 0;
            } 
        }
    }

    private showPreviousRound() {
        this.currentRoundIndex--;
        this.currentRound = this.grillRounds[this.currentRoundIndex];
        this.onCurrentRoundChanged.emit(this.currentRound);
    }

    private showNextRound() {
        this.currentRoundIndex++;
        this.currentRound = this.grillRounds[this.currentRoundIndex];
        this.onCurrentRoundChanged.emit(this.currentRound);
    }
}
