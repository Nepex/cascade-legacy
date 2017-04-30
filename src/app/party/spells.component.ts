import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessages } from '../layout/alert-messages.component';

@Component({
    selector: 'cascade-spells',
    templateUrl: './spells.html',
    styleUrls: ['./spells.css']
})

export class SpellsComponent implements OnInit {
    @Input() partyMember;
    messages: AlertMessages[] = []; 

    constructor(private activeModal: NgbActiveModal) {
        
    }

    ngOnInit() {
        if (!this.partyMember.spells) {
            this.messages.push({
                message: "No spells have been learned",
                type: "error"
            });
        }
    }
}