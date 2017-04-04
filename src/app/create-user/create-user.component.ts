import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'cascade-create-user',
    templateUrl: 'create-user.html',
    styleUrls: ['create-user.css']
})
export class CreateUserComponent {

    createForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
        passwordConfirm: new FormControl('', [Validators.required])
    });
    
}