import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { UserService, LocationService } from '../../../api/index';

@Component({
    selector: 'arc-ritual-grounds',
    templateUrl: './ritual-grounds.html',
    styleUrls: ['../zones.css'],
    animations: [
        trigger('visibilityChanged', [
            state('hidden', style({ display: 'none', opacity: 0 })),
            state('shown', style({ display: 'block', opacity: 1 })),

            transition('hidden => shown', animate('1000ms ease-in')),
            transition('shown => hidden', animate('1000ms ease-out'))
        ])
    ]
})
export class RitualGroundsComponent {

    blackScreen = 'hidden';
    travelSpan = 7;

    loadingRequest: Observable<any>;
    moveRequest: Observable<any>;
    location: Location = {
        zone: 'Ritual Grounds',
        x: 4,
        y: 1
    };

    user: any = {};

    constructor(private userService: UserService, private locationService: LocationService) { }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.locationService.setLocation(location)
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
        });
    }

    move(direction) {
        if (direction === 'left') {
            if (this.location.x - 1 <= 0) {
                this.location.x = this.travelSpan;
            } else {
                this.location.x = this.location.x - 1;
            }
            this.randomEncounter();
        }

        else if (direction === 'right') {
            if (this.location.x + 1 > this.travelSpan) {
                this.location.x = 1;
            } else {
                this.location.x = this.location.x + 1;
            }
            this.randomEncounter();
        }

        else if (direction === 'down') {
            if (this.location.y - 1 <= 0) {
                this.location.y = this.travelSpan;
            } else {
                this.location.y = this.location.y - 1;
            }
            this.randomEncounter();
        }

        else if (direction === 'up') {
            if (this.location.y + 1 > this.travelSpan) {
                this.location.y = 1;
            } else {
                this.location.y = this.location.y + 1;
            }
            this.randomEncounter();
        }

        this.moveRequest = this.locationService.setLocation(this.location)

        this.moveRequest.subscribe(res => { this.moveRequest = null; });
    }

    randomEncounter() {

        let randomNumber = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

        // if (randomNumber < 30) {
        //     this.blackScreen = 'shown';

        //     setTimeout(() => {
        //         this.blackScreen = 'hidden';
        //     }, 2000);
        // }
    }
}

class Location {
    zone: string;
    x: number;
    y: number;
}
