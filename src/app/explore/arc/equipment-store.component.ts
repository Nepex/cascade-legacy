import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'underscore';

import { UserService } from '../../api/index';
import { AlertMessages } from '../../layout/alert-messages.component';

@Component({
    selector: 'app-arc-equipment-store',
    templateUrl: 'blue-moon-inn.html',
    styleUrls: ['arc.css']
})
export class ArcEquipmentStoreComponent implements OnInit {

    state = 'hidden';

    portrait;
    speakerName;
    dialogue;
    backdrop;
    continuable;
    backAllowed;
    zoneTitle;

    tourDialoguePhase = 1;
    user: any = {};
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
        });

        setTimeout(() => {
            this.state = 'shown';
        }, 50);

        this.continuable = false;
        this.backAllowed = true;
        this.zoneTitle = 'Arc (Equipment Store)';
        this.backdrop = 'arc-equipment-store.jpg';
        this.speakerName = 'Tosin';
        this.portrait = 'arc-tosin.png';
        this.dialogue = 'Take a look around.';
    }

    progressDialogue(e) {
        if (e < 0) {
            this.router.navigateByUrl('/arc');
        }
    }
}
