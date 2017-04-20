import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'cascade-spells',
    templateUrl: './spells.html',
    styleUrls: ['./spells.css']
})

export class SpellsComponent {
    @Input() partyMember;

    constructor(private activeModal: NgbActiveModal) {}
}