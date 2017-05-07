import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService, LocationService } from '../../../api/index';

@Component({
    selector: 'arc-ritual-grounds',
    templateUrl: './ritual-grounds.html',   
    styleUrls: ['../zones.css']
})
export class RitualGroundsComponent {

    loadingRequest: Observable<any>;
    user: any = {};

    constructor(private userService: UserService, private locationService: LocationService){}

    ngOnInit() {
        let location = {
            zone: 'Ritual Grounds',
            x: 0,
            y: 0
        };

        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.locationService.setLocation(location)
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
        });
    }
}
