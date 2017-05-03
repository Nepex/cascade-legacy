import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MailboxService, UserService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';

import { MailboxComponent } from './mailbox.component';

import * as moment from 'moment';

@Component({
    selector: 'cascade-send-message',
    templateUrl: './send-message.html',
    styleUrls: ['./send-message.css']
})

export class SendMessageComponent {
    @Input() receiver;

    messages: AlertMessages[] = [];
    user: any = {};
    loadingRequest: Observable<any>;
    userRegex = /^[a-zA-Z0-9]*$/;
    messageForm: FormGroup = new FormGroup({
        receiver: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(this.userRegex)]),
        message: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });

    constructor(private activeModal: NgbActiveModal, private mailboxService: MailboxService, private userService: UserService) { }


    ngOnInit() {
        this.loadingRequest = this.userService.getUser();

        this.loadingRequest.subscribe(res => {
            this.loadingRequest = null;
            this.user = res;
        });

        if (this.receiver) {
            this.messageForm.controls.receiver.setValue(this.receiver);
        }
    }

    sendMessage() {
        this.messageForm['submitted'] = true;

        if (!this.messageForm.valid) {
            return;
        }

        if (this.loadingRequest) {
            return;
        }

        let date = moment().format("MM/DD/YY");
        let time = moment().format("hh:mm a");

        let sentMessage = {
            sender: this.user.username,
            receiver: this.messageForm.value.receiver,
            message: this.messageForm.value.message,
            date: date,
            time: time
        };

        this.loadingRequest = this.mailboxService.create(sentMessage);

        this.loadingRequest.subscribe(res => {
            if (res._body === 'username doesnt exist') {
                this.messages.push({
                    message: 'That user does not exist',
                    type: 'error'
                });
                return;
            }

            this.loadingRequest = null;

            this.messageForm.reset();
            this.messageForm['submitted'] = false;

            this.messages = [];
            this.messages.push({
                message: 'Message sent',
                type: 'success'
            });

            this.messages.push({
                message: 'Closing window...',
                type: 'success'
            });

            setTimeout(() => {
                this.activeModal.close();
            }, 1000)
        });

    }
}