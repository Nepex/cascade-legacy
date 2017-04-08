import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';

import { ParamSerializer } from '../api/param-serializer';
import { AlertMessages } from '../layout/alert-messages.component';

import 'rxjs/Rx';

@Component({
    selector: 'app-create-user',
    templateUrl: 'create-user.html',
    styleUrls: ['create-user.css']
})
export class CreateUserComponent {

    messages: AlertMessages[];
    loadingRequest: Subscription;
    emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    createForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
        passwordConfirm: new FormControl('', [Validators.required])
    }, this.validateMatchingPasswords());

    constructor(private http: Http, private paramSerializer: ParamSerializer) { }

    validateMatchingPasswords() {
        return (group: FormGroup): { [key: string]: any } => {
            const password = group.controls['password'];
            const passwordConfirm = group.controls['passwordConfirm'];

            if (password.value !== passwordConfirm.value) {

                passwordConfirm.setErrors({ match: 'Passwords must match' });

                return {
                    mismatchedPasswords: true
                };
            }

            return null;
        };
    }

    create() {
        this.messages = [];
        this.createForm['submitted'] = true;

        if (!this.createForm.valid) {
            return;
        }

        if (this.loadingRequest) {
            return;
        }

        const body = {
            username: this.createForm.value.username,
            email: this.createForm.value.email,
            password: this.createForm.value.password
        };

        let serializedParams = this.paramSerializer.serialize(body);
        const req = `http://127.0.0.1/create-user.php?${serializedParams}`;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');

        this.loadingRequest = this.http.post(req, { headers: headers })
            .share()
            .subscribe(res => {
                this.messages.push({
                    message: 'Account created successfully.',
                    type: 'success'
                });

                this.createForm['submitted'] = false;
                this.createForm.reset();
                this.loadingRequest = null;
            });
    }
}
