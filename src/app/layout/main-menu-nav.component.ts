import { Component, Input } from '@angular/core';

@Component({
    selector: 'cascade-main-menu-nav',
    templateUrl: './main-menu-nav.html',
    styleUrls: ['./main-menu-nav.css']
})
export class MainMenuNavComponent {
    @Input() selectedTab = 'PARTY';

}