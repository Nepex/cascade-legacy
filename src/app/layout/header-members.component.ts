import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SessionStateService } from '../api/index';
import { ParamSerializer } from '../api/param-serializer';
import { SettingsComponent } from './settings-modal.component';

@Component({
    selector: 'cascade-header-members',
    templateUrl: './header-members.html',
    styleUrls: ['./header-members.css']
})
export class HeaderMembersComponent {
    @Input() user;
    @Input() currency;

    showMenu = false;

    constructor(private sessionStateService: SessionStateService, private router: Router, private modalService: NgbModal) {}

    logout() {
        this.sessionStateService.logout();
        this.router.navigateByUrl('');
    }

    displaySettings() {
        const modalRef = this.modalService.open(SettingsComponent, {size: 'sm'});
    }

    closeMenu() {
        this.showMenu = false;
    }
}