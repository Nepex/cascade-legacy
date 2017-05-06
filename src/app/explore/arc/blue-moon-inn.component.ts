import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'underscore';

import { UserService } from '../../api/index';
import { AlertMessages } from '../../layout/alert-messages.component';

@Component({
    selector: 'app-arc-blue-moon-inn',
    templateUrl: 'blue-moon-inn.html',
    styleUrls: ['arc.css']
})
export class ArcBlueMoonInnComponent implements OnInit {

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
        this.zoneTitle = 'Arc (Blue Moon Inn)';
        this.backdrop = 'arc-blue-moon-inn2.jpg';
        this.speakerName = 'Lisbeth';
        this.portrait = 'arc-lisbeth.png';
        this.dialogue = 'Would you like to stay for <i class="fa fa-diamond"></i>15?';
    }

    progressDialogue(e) {
        if (e < 0) {
            this.router.navigateByUrl('/arc');
        }
    }
}
