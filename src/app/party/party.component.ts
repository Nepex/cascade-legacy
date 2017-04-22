import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService, PartyService } from '../api/index';
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
    spellsLearned: any;
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;
    removeRequest: Observable<any>;

    constructor(private userService: UserService, private partyService: PartyService, private modalService: NgbModal) {
        this.activate();
    }

    activate() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.partyService.getParty()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0][0];

            this.party = [];

            if (res[1]) {
                for (let i = 0; i < res[1].length; i++) {
                    this.party.push(res[1][i]);
                }
            }

            // bind spells to party members
            for (let i = 0; i < this.party.length; i++) {
                this.partyService.getSpells(this.party[i].name)
                    .subscribe(res => {
                        if (!res) {
                            return;
                        }
                        this.spellsLearned = res;
                        for (let i = 0; i < this.party.length; i++) {
                            for (let j = 0; j < this.spellsLearned.length; j++) {
                                if (this.party[i].name === this.spellsLearned[j].party_member) {
                                    this.party[i].spells = [];

                                    this.party[i].spells.push({
                                        spell_name: this.spellsLearned[j].spell_name,
                                        cost: this.spellsLearned[j].cost,
                                        description: this.spellsLearned[j].description,
                                        icon: this.spellsLearned[j].spell_name.toLowerCase() + '.png'
                                    });
                                }
                            }
                        }
                    });
            }
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
