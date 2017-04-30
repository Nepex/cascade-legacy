import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { InventoryService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';

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

    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;

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
        if (item.id === 'empty') {
            return;
        }

        item.partyId = this.partyMember.id;

        this.loadingRequest = this.inventoryService.unequip(item);

        this.loadingRequest.subscribe(res => {
            this.activeModal.close(item.name);
        });
    }
}
