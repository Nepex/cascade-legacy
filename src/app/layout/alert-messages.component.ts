import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'cascade-alert-messages',
    template:
    `<div class="text-center" style="padding-top: 20px;" *ngFor="let m of messages">
        <div class="{{ m.type }}" *ngIf="m">
            
            <div style="position: relative; margin-left: auto; margin-right: auto;">
            <p style="position: absolute;">
                <i class="fa fa-times" style="cursor: pointer; position: absolute; top: -9px; left: 176px; font-size: 11px;" (click)="close(m)"></i>
            </p>
                {{ m.message }}
            </div>

        </div>        
    </div>`,
    styleUrls: ['./alert-messages.css']
})
export class AlertMessagesComponent {
    @Input() messages;

    close(m) {
        for (let i = 0; i < this.messages.length; i++) {
            if (m.message === this.messages[i].message) {
                this.messages.splice(i, 1);
            }
        }
    }
}

export class AlertMessages {
    message: string;
    type: string;
}
