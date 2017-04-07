import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertMessages } from '../layout/alert-messages.component';

@Component({
    selector: 'app-create-user',
    templateUrl: 'create-user.html',
    styleUrls: ['create-user.css']
})
export class CreateUserComponent {

    messages: AlertMessages[];
    emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    createForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
        passwordConfirm: new FormControl('', [Validators.required])
    }, this.validateMatchingPasswords());

    constructor(private http: Http) { }

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

        const url = `../api/create-user.php`;
        const body = {
            username: this.createForm.value.username,
            email: this.createForm.value.email,
            password: this.createForm.value.password
        };
        const headers = new Headers({ 'Content-Type': 'application/json' });

        this.http.post(url, body, { headers: headers })
            .subscribe(res => {
                console.log(res);
            });

        this.messages.push({
            message: 'Account created successfully.',
            type: 'success'
        });

        this.createForm.reset();
        this.createForm['submitted'] = false;
    }
}
