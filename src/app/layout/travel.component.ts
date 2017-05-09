import { Component, Input, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgxAni, NgxCss } from 'ngxani';

@Component({
    selector: 'cascade-travel',
    templateUrl: './travel.html',
    styleUrls: ['./travel.css'],
    animations: [
        trigger('visibilityChanged', [
            state('hidden', style({ display: 'none', opacity: 0 })),
            state('shown', style({ display: 'block', opacity: 1 })),

            transition('hidden => shown', animate('1000ms ease-in')),
            transition('shown => hidden', animate('1000ms ease-out'))
        ])
    ]
})
export class TravelComponent {
    @Input() zone: string;
    y = 100;
    x = 50;

    blackScreen = 'hidden';
    animationImage = 'north1';

    enemies = [];
    inCombat = false;
    showArrows = true;

    constructor(private elementRef: ElementRef, private ngxAni: NgxAni, private ngxCss: NgxCss) { }

    randomEncounter() {
        // put in logic for encounters and different sets of enemies baed on the zone passed in
        // possibly break out into another file?
        let randomNumber = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

        if (randomNumber < 30) {
            this.showArrows = false;
            this.blackScreen = 'shown';

            setTimeout(() => {
                this.blackScreen = 'hidden';
                this.inCombat = true;
                this.showArrows = true;
            }, 2000);
        }
    }

    private moveNorth(dom: ElementRef) {
        if (this.y - 10 <= 0) {
            return;
        }

        this.y = this.y - 10;

        this.ngxAni.to(dom, .9, {
            position: 'absolute',
            top: '' + (this.y) + '%'
        });

        this.animationImage = 'north1';
        this.showArrows = false;

        setTimeout(() => {
            this.animationImage = 'north2';
        }, 300)

        setTimeout(() => {
            this.animationImage = 'north3';
        }, 600)

        setTimeout(() => {
            this.animationImage = 'north1';
            this.showArrows = true;
            this.randomEncounter();
        }, 900)
    }

    private moveSouth(dom: ElementRef) {
        if (this.y + 10 > 100) {
            return;
        }

        this.y = this.y + 10;

        this.ngxAni.to(dom, .9, {
            position: 'absolute',
            top: '' + (this.y) + '%'
        });

        this.animationImage = 'south1';
        this.showArrows = false;

        setTimeout(() => {
            this.animationImage = 'south2';
        }, 300)

        setTimeout(() => {
            this.animationImage = 'south3';
        }, 600)

        setTimeout(() => {
            this.animationImage = 'south1';
            this.showArrows = true;
            this.randomEncounter();
        }, 900)

    }

    private moveEast(dom: ElementRef) {
        if (this.x + 10 >= 100) {
            return;
        }

        this.x = this.x + 10;

        this.ngxAni.to(dom, .9, {
            position: 'absolute',
            left: '' + (this.x) + '%'
        });

        this.animationImage = 'east1';
        this.showArrows = false;

        setTimeout(() => {
            this.animationImage = 'east2';
        }, 300)

        setTimeout(() => {
            this.animationImage = 'east3';
        }, 600)

        setTimeout(() => {
            this.animationImage = 'east1';
            this.showArrows = true;
            this.randomEncounter();
        }, 900)

    }

    private moveWest(dom: ElementRef) {
        if (this.x - 10 <= 0) {
            return;
        }

        this.x = this.x - 10;

        this.ngxAni.to(dom, .9, {
            position: 'absolute',
            left: '' + (this.x) + '%'
        });
        this.animationImage = 'west1';
        this.showArrows = false;

        setTimeout(() => {
            this.animationImage = 'west2';
        }, 300)

        setTimeout(() => {
            this.animationImage = 'west3';
        }, 600)

        setTimeout(() => {
            this.animationImage = 'west1';
            this.showArrows = true;
            this.randomEncounter();
        }, 900)

    }
}