import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService, PartyService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';


@Component({
    selector: 'cascade-hire',
    templateUrl: './hire.html',
    styleUrls: ['./hire.css']
})

export class HireComponent {
    constructor(private activeModal: NgbActiveModal, private partyService: PartyService, private userService: UserService) { }

    loadingRequest: Observable<any>;
    userRegex = /^[a-zA-Z0-9]*$/;
    hireForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(this.userRegex)]),
        job: new FormControl('', [Validators.required]),
        sprite: new FormControl('sprite1', [Validators.required])
    });

    selectSprite(s) {
        this.hireForm.controls['sprite'].setValue('sprite' + s);
    }

    hire() {
        this.hireForm['submitted'] = true;

        if (!this.hireForm.valid) {
            return;
        }

        if (this.loadingRequest) {
            return;
        }

        const body = {
            name: this.hireForm.value.name,
            job: this.hireForm.value.job,
            sprite: this.hireForm.value.sprite
        };

        this.loadingRequest = this.partyService.hirePartyMember(body);

        this.loadingRequest.subscribe(res => {
            this.loadingRequest = null;
            this.hireForm['submitted'] = false;

            this.activeModal.close();
        });
    }
}