import { Component, Input } from '@angular/core';

@Component({
    selector: 'cascade-travel',
    templateUrl: './travel.html',
    styleUrls: ['./travel.css']
}) 
export class TravelComponent {
    @Input() zone: string;
    @Input() x: number;
    @Input() y: number;

    constructor() {}
}