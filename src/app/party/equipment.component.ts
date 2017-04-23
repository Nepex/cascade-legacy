import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { InventoryService } from '../api/index';

@Component({
    selector: 'cascade-equipment',
    templateUrl: './equipment.html',
    styleUrls: ['./equipment.css']
})

export class EquipmentComponent implements OnInit {
    @Input() partyMember;
    helm;
    chest;
    mainHand;
    offHand;
    accessory;

    constructor(private inventoryService: InventoryService, private activeModal: NgbActiveModal) {
    }

    ngOnInit() {
        this.helm = this.inventoryService.getItem(this.partyMember.helm, 1);
        this.chest = this.inventoryService.getItem(this.partyMember.chest, 1);
        this.mainHand = this.inventoryService.getItem(this.partyMember.mainHand, 1);
        this.offHand = this.inventoryService.getItem(this.partyMember.offHand, 1);
        this.accessory = this.inventoryService.getItem(this.partyMember.accessory, 1);
    }

    unequip(item, slot) {
    }
}
