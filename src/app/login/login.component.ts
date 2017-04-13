import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { SessionService, SessionStateService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';

@Component({
    selector: 'app-login',
    templateUrl: 'login.html',
    styleUrls: ['login.css']
})
export class LoginComponent {

    messages: AlertMessages[];
    redirectUrl: string = null;

    loginRequest: Observable<any>;
    loginForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });

    constructor(private router: Router, private sessionStateService: SessionStateService, private sessionService: SessionService,
        private activatedRoute: ActivatedRoute) {
        this.activate();
    }

    activate() {
        if (this.sessionStateService.isAuthenticated()) {
            this.router.navigateByUrl('/party');
        }
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.redirectUrl = param['redirect'];
            });
    }

    login() {
        if (this.loginRequest) {
            return;
        }

        this.messages = [];
        this.loginForm['submitted'] = true;

        if (!this.loginForm.valid) {
            return;
        }

        this.loginRequest = this.sessionService.login(this.loginForm.value);
        this.loginRequest.subscribe(
            res => {
                if (res === 'incorrect credentials') {
                    this.messages.push({
                        message: 'Incorrect credentials.',
                        type: 'error'
                    });

                    this.loginForm['submitted'] = false;
                    this.loginRequest = null;

                    return;
                }

                if (this.redirectUrl) {
                    this.router.navigate([this.redirectUrl]);
                } else {
                    this.router.navigate(['/party']);
                }

                this.loginForm['submitted'] = false;
                this.loginRequest = null;
            });
    }
}