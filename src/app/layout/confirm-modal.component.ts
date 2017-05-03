import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cascade-confirm-modal',
  template: `
    <div id="confirmationModal">
      <div class="modal-header">
          <span class="modal-title pull-left">Are you sure?</span>
          <button type="button" class="close pull-right" aria-label="Close" (click)="activeModal.dismiss('cancel')">
          <span style="color:#fff" aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <p>{{message}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm" id="btn-1" (click)="activeModal.close('ok')" style="cursor: pointer;">Ok</button>
        <button type="button" class="btn btn-sm" id="btn-1" (click)="activeModal.dismiss('cancel')" style="cursor: pointer;">Cancel</button>
      </div>
    </div>
  `,
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input() message;

  constructor(public activeModal: NgbActiveModal) {}
}