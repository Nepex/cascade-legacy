import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SessionStateService } from '../api/index';
import { ParamSerializer } from '../api/param-serializer';
@Component({
    selector: 'cascade-header-members',
    templateUrl: './header-members.html',
    styleUrls: ['./header-members.css']
})
export class HeaderMembersComponent {
    @Input() user;
    @Input() currency;

    constructor(private sessionStateService: SessionStateService, private router: Router) {}

    logout() {
        this.sessionStateService.logout();
        this.router.navigateByUrl('');
    }
}