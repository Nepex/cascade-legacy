import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionService, SessionStateService } from '../api/index';

@Component({
  selector: 'cascade-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(private router: Router, private sessionStateService: SessionStateService, private sessionService: SessionService,
        private activatedRoute: ActivatedRoute) {
        this.activate();
    }

  activate() {
        if (this.sessionStateService.isAuthenticated()) {
            this.router.navigateByUrl('/party');
        }
    }

}
