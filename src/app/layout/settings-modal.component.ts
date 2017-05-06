import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SettingsService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';


@Component({
    selector: 'cascade-settings',
    templateUrl: './settings-modal.html',
    styleUrls: ['./settings-modal.css']
})

export class SettingsComponent {
    constructor(private activeModal: NgbActiveModal, private settingsService: SettingsService) { }

    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;
    emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    emailForm: FormGroup = new FormGroup({
        newEmail: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    });

    passwordForm: FormGroup = new FormGroup({
        oldPassword: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
        newPassword: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)])
    });

    changeEmail() {
        this.messages = [];
        this.emailForm['submitted'] = true;

        if (!this.emailForm.valid) {
            return;
        }

        if (this.loadingRequest) {
            return;
        }

        this.loadingRequest = this.settingsService.changeEmail(this.emailForm.value.newEmail);

        this.loadingRequest.subscribe(res => {
            this.loadingRequest = null;
            this.emailForm['submitted'] = false;

            if (res._body === 'email taken') {
                this.messages.push({
                    message: 'That email is taken',
                    type: 'error'
                });

                return;
            } else {
                this.messages.push({
                    message: 'Email successfully changed',
                    type: 'success'
                });

                this.emailForm.reset();
            }
        });
    }

    changePassword() {
        this.passwordForm['submitted'] = true;

        if (!this.passwordForm.valid) {
            return;
        }

        if (this.loadingRequest) {
            return;
        }

        let body = {
            oldPassword: this.passwordForm.value.oldPassword,
            newPassword: this.passwordForm.value.newPassword
        }

        this.loadingRequest = this.settingsService.changePassword(body);

        this.loadingRequest.subscribe(res => {
            this.messages = [];
            this.loadingRequest = null;
            this.passwordForm['submitted'] = false;

            if (res._body === 'incorrect credentials') {
                this.messages.push({
                    message: 'Incorrect password',
                    type: 'error'
                });

                return;
            }

            this.messages.push({
                message: 'Password successfully changed',
                type: 'success'
            });

            this.passwordForm.reset();
        });
    }
}