import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'cascade-equipment',
    templateUrl: './equipment.html',
    styleUrls: ['./equipment.css']
})

export class EquipmentComponent {
    @Input() partyMember;

    constructor(private activeModal: NgbActiveModal) {}
}