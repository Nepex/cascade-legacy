import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService, PartyService, InventoryService, MailboxService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';
import { HireComponent } from './hire.component';
import { StatsComponent } from './stats.component';
import { SpellsComponent } from './spells.component';
import { EquipmentComponent } from './equipment.component';
import { ConfirmModalComponent } from '../layout/confirm-modal.component';

@Component({
    selector: 'app-party',
    templateUrl: 'party.html',
    styleUrls: ['party.css']
})
export class PartyComponent {

    user: any = {};
    party: any = [];
    inventory: any = {};
    mail: any = [];
    spellsLearned: any;
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;
    removeRequest: Observable<any>;

    constructor(private userService: UserService, private partyService: PartyService, private inventoryService: InventoryService, private modalService: NgbModal,
        private mailboxService: MailboxService) {
        this.activate();
    }

    activate() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.partyService.getParty(),
            this.inventoryService.getInventory(),
            this.mailboxService.getMessages()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
            this.party = res[1];
            this.inventory = res[2];
            this.mail = res[3];
        });
    }

    hire() {
        let modalRef = this.modalService.open(HireComponent);

        modalRef.result.then((result) => {
            this.activate();
            this.messages = [];
            this.messages.push({ message: 'Party member recruited', type: 'success' });
        }, (reason) => { });

        return false;
    }

    displayStats(partyMember) {
        const modalRef = this.modalService.open(StatsComponent, { size: 'sm' });
        modalRef.componentInstance.partyMember = partyMember;
    }

    displayEquipment(partyMember) {
        const modalRef = this.modalService.open(EquipmentComponent);
        modalRef.componentInstance.partyMember = partyMember;

        modalRef.result.then((result) => {
            this.activate();
            this.messages = [];
            this.messages.push({ message: `${result} unequipped`, type: 'success' });
        }, (reason) => { });

        return false;
    }

    onUnequip() {
        this.activate();
    }

    displaySpells(partyMember) {
        const modalRef = this.modalService.open(SpellsComponent);
        modalRef.componentInstance.partyMember = partyMember;
    }

    confirmRemove(id: number) {
        const modalRef = this.modalService.open(ConfirmModalComponent);
        modalRef.componentInstance.message = 'Are you sure you want to remove this party member?';

        modalRef.result.then((result) => {
            this.remove(id);
        }, (reason) => { });
    }

    remove(id: number) {
        this.messages = [];

        if (this.removeRequest) {
            return;
        }

        this.removeRequest = this.partyService.remove(id);
        this.removeRequest.subscribe(
            () => {
                this.removeRequest = null;
                this.messages.push({ message: 'Party member was removed', type: 'success' });
                this.activate();
            });
    }
}
