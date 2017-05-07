import { Component, Input } from '@angular/core';

@Component({
    selector: 'arc-travel-component',
    templateUrl: './travel.html',
    styleUrls: ['./travel.css']
}) 
export class TravelComponent {
    @Input() zone;

    constructor() {}
}