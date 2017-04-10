import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { SessionStateService } from '../api/index';
import { ParamSerializer } from '../api/param-serializer';
import { AlertMessages } from '../layout/alert-messages.component';

import 'rxjs/Rx';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.html',
    styleUrls: ['dashboard.css']
})
export class DashboardComponent {

    messages: AlertMessages[];
    loadingRequest: Observable<any>;

    constructor(private sessionStateService: SessionStateService, private router: Router) {
        this.activate();
    }


    activate() { }

    logout() {
        this.sessionStateService.logout();
        this.router.navigateByUrl('');
    }
}
