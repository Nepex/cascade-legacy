import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService, SessionStateService } from '../api/index';

@Component({
    selector: 'cascade-home',
    templateUrl: './home.html',
    styleUrls: ['./home.css'],
    animations: [
        trigger('visibilityChanged', [
            state('hidden', style({ opacity: 0 })),
            state('shown', style({ opacity: 1 })),

            transition('hidden => shown', animate('1000ms ease-in'))
        ])
    ]
})
export class HomeComponent {

    state = 'hidden';

    constructor(private router: Router, private sessionStateService: SessionStateService, private sessionService: SessionService,
        private activatedRoute: ActivatedRoute) {
        this.activate();
    }

    activate() {
        if (this.sessionStateService.isAuthenticated()) {
            this.router.navigateByUrl('/party');
        }

        setTimeout(() => {
            this.state = 'shown';
        }, 50);
    }

}
