import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../../../api/index';

@Component({
    selector: 'arc-ritual-grounds',
    templateUrl: './ritual-grounds.html',
    styleUrls: ['../zones.css']
})
export class RitualGroundsComponent {

    loadingRequest: Observable<any>;
    zone: 'Ritual Grounds'

    user: any = {};

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
        });
    } 
}
