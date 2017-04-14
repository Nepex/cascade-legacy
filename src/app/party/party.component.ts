import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';
import { HireComponent } from './hire.component'; 

@Component({
    selector: 'app-party',
    templateUrl: 'party.html',
    styleUrls: ['party.css']
})
export class PartyComponent {

    user: any = {};
    party: any = {};
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;

    constructor(private userService: UserService, private modalService: NgbModal) {
        this.activate();
    }

    activate() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.userService.getParty()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0][0];

            if (res[1]) {
                this.party.partyMemberOne = res[1][0];
                this.party.partyMemberTwo = res[1][1];
                this.party.partyMemberThree = res[1][2];
                this.party.partyMemberFour = res[1][3];
            }
        });
    }

    hire() {
        let modalRef = this.modalService.open(HireComponent);

        modalRef.result.then((result) => {
            this.activate();
            this.messages.push({ message: 'Party member recruited.', type: 'success' });
        }, (reason) => { });

        return false;
    }

}
