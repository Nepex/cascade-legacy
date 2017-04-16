import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';

import { UserService } from '../api/index';
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
    loadingRequest: Observable<any>;
    userRegex = /^[a-zA-Z0-9]*$/;
    emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    createForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(this.userRegex)]),
        email: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern(this.emailRegex)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
        passwordConfirm: new FormControl('', [Validators.required])
    }, this.validateMatchingPasswords());

    constructor(private http: Http, private paramSerializer: ParamSerializer, private userService: UserService, private router: Router) { }

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

        this.loadingRequest = this.userService.create(body);

        this.loadingRequest.subscribe(res => {
            this.loadingRequest = null;
            this.createForm['submitted'] = false;

            if (res._body === 'username taken') {
                this.messages.push({
                    message: 'That username is taken.',
                    type: 'error'
                });

                return;
            } else if (res._body === 'email taken') {
                this.messages.push({
                    message: 'That email is taken.',
                    type: 'error'
                });

                return;
            } else {
                this.messages.push({
                    message: 'Account created successfully!',
                    type: 'success'
                });

                this.messages.push({
                    message: 'Redirecting to login...',
                    type: 'success'
                });


                setTimeout(() => {
                    this.router.navigateByUrl('/login');
                }, 3000);

                this.createForm.reset();
            }
        });
    }
}
