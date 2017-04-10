import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AlertMessages } from '../layout/alert-messages.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.html',
    styleUrls: ['dashboard.css']
})
export class DashboardComponent {

    messages: AlertMessages[];
    loadingRequest: Observable<any>;

    constructor() {
        this.activate();
    }

    activate() { }
}
