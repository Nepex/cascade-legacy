import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: 'login.html',
    styleUrls: ['login.css']
})
export class LoginComponent {

    loginForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

}