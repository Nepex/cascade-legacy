import { Component } from '@angular/core';

import * as moment from 'moment';

@Component({
    selector: 'cascade-footer',
    templateUrl: './footer.html',
    styleUrls: ['./footer.css']
})
export class FooterComponent {

    date = moment().format('YYYY');

    constructor() {
    }
}