import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.html',
    styleUrls: ['dashboard.css']
})
export class DashboardComponent implements OnInit {

    user: any = {};
    messages: AlertMessages[];
    loadingRequest: Observable<any>;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.loadingRequest = this.userService.getUser();

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
        });
    }

}
