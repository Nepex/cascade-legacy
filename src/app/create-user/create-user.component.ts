import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-create-user',
    templateUrl: 'create-user.html',
    styleUrls: ['create-user.css']
})
export class CreateUserComponent {


    emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    createForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
        passwordConfirm: new FormControl('', [Validators.required])
    }, this.validateMatchingPasswords());

    constructor() { }

    validateMatchingPasswords() {
        return (group: FormGroup): { [key: string]: any } => {
            const password = group.controls['password'];
            const passwordConfirm = group.controls['passwordConfirm'];

            if (password.value !== passwordConfirm.value) {

                passwordConfirm.setErrors({ match: 'Passwords must match' });
                console.log(this.createForm);

                return {
                    mismatchedPasswords: true
                };

            }

            return null;
        };
    }

    create() {
        this.createForm['submitted'] = true;

        if (!this.createForm.valid) {
            return;
        }
    }
}
