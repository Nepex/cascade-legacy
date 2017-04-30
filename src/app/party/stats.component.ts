import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'cascade-stats',
    templateUrl: './stats.html',
    styleUrls: ['./stats.css']
})

export class StatsComponent {
    @Input() partyMember: any;

    constructor(private activeModal: NgbActiveModal) {
        
    }
}