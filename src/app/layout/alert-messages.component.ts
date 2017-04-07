import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-alert-messages',
    template:
    `<div class="text-center" style="padding-top: 20px;" *ngFor="let m of messages">
        <div class="{{ m.type }}">
            {{ m.message }}
        </div>        
    </div>`,
    styleUrls: ['./alert-messages.css']
})
export class AlertMessagesComponent {
    @Input() messages;
}

export class AlertMessages {
    message: string;
    type: string;
}
