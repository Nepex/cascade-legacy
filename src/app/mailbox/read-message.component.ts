import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MailboxService } from '../api/index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendMessageComponent} from './send-message.component';

@Component({
    selector: 'cascade-read-message',
    templateUrl: './read-message.html',
    styleUrls: ['./read-message.css']
})

export class ReadMessageComponent implements OnInit {
    @Input() message;

    loadingRequest: Observable<any>;

    constructor(private activeModal: NgbActiveModal, private modalService: NgbModal, private mailboxService: MailboxService) { }

    ngOnInit() {
        this.loadingRequest = this.mailboxService.markRead(this.message.id);

        this.loadingRequest.subscribe(res => {});
    }

    reply(receiver) {
        const modalRef = this.modalService.open(SendMessageComponent);
        modalRef.componentInstance.receiver = receiver;
        this.activeModal.close();    
    }
}