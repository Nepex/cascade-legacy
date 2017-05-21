import { Component, Input, ElementRef, HostListener, ViewChild, OnChanges, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxAni, NgxCss } from 'ngxani';

import { EnemyService, PartyService } from '../api/index';
import { MappingService } from '../explore/mapping.service';
import { EncountersService } from '../explore/encounters.service';

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
export class TravelComponent implements OnInit {
    @Input() zone: string;
    @ViewChild('character') character;
    @ViewChild('backdrop') backdrop;

    y = 100;
    x = 50;

    blackScreen = 'hidden';
    animationImage = 'north1';

    enemies: any = [];
    loadingRequest: Observable<any>;
    inCombat = false;
    showArrows = true;

    @HostListener('window:keydown', ['$event'])
    onKeyDown(ev: KeyboardEvent) {
        if (this.showArrows && !this.inCombat) {
            if (ev.key === 'w') {
                this.move(this.character, 'north');
            } else if (ev.key === 's') {
                this.move(this.character, 'south');
            } else if (ev.key === 'a') {
                this.move(this.character, 'west');
            } else if (ev.key === 'd') {
                this.move(this.character, 'east');
            }
        }
    }

    constructor(private elementRef: ElementRef, private ngxAni: NgxAni, private ngxCss: NgxCss, private enemyService: EnemyService,
        private mappingService: MappingService, private encountersService: EncountersService, private partyService: PartyService, private router: Router) {
    }

    ngOnInit() {
        this.loadingRequest = this.partyService.getParty();

        this.loadingRequest.subscribe(res => {
            let party = res;
            let totalHp = 0;

            for (let i = 0; i < party.length; i++) {
                totalHp = totalHp + party[i].currHp;
            }

            if (totalHp === 0) {
                this.router.navigateByUrl('/explore');
            }
        });
    }

    randomEncounter() {
        this.enemies = [];
        let randomNumber = Math.floor((Math.random() * 100) + 1);
        let encounteredEnemies = this.encountersService.detemineEncounter(randomNumber, this.zone);

        if (encounteredEnemies.length < 1) {
            return;
        }

        // else enter combat
        this.showArrows = false;
        this.blackScreen = 'shown';

        setTimeout(() => {
            this.blackScreen = 'hidden';

            for (let i = 0; i < encounteredEnemies.length; i++) {
                this.enemies.push(this.enemyService.getEnemy(encounteredEnemies[i]));
            }

            this.showArrows = true;
            this.inCombat = true;
        }, 2000);
    }

    move(dom: ElementRef, direction) {

        switch (direction) {

            case 'north':
                // if at the edge of the map, move to next zone
                if (this.y - 10 <= 0) {
                    let continuePossible = this.checkForNextLoc('north');

                    if (!continuePossible) {
                        return;
                    }

                    this.ngxAni.to(dom, 0, {
                        position: 'absolute',
                        top: '100%',
                    });
                    this.y = 100;

                    return;
                }

                // else continue on current map
                this.y = this.y - 10;

                this.ngxAni.to(dom, .9, {
                    position: 'absolute',
                    top: '' + (this.y) + '%',
                });
                break;

            case 'south':
                if (this.y + 10 > 100) {
                    let continuePossible = this.checkForNextLoc('south');

                    if (!continuePossible) {
                        return;
                    }

                    this.ngxAni.to(dom, 0, {
                        position: 'absolute',
                        top: '10%',
                    });
                    this.y = 10;

                    return;
                }

                this.y = this.y + 10;

                this.ngxAni.to(dom, .9, {
                    position: 'absolute',
                    top: '' + (this.y) + '%'
                });
                break;

            case 'west':
                if (this.x - 10 <= 0) {
                    let continuePossible = this.checkForNextLoc('west');

                    if (!continuePossible) {
                        return;
                    }

                    this.ngxAni.to(dom, 0, {
                        position: 'absolute',
                        left: '100%',
                    });
                    this.x = 100;

                    return;
                }

                this.x = this.x - 10;

                this.ngxAni.to(dom, .9, {
                    position: 'absolute',
                    left: '' + (this.x) + '%'
                });
                break;

            case 'east':
                if (this.x + 10 >= 100) {
                    let continuePossible = this.checkForNextLoc('east');

                    if (!continuePossible) {
                        return;
                    }

                    this.ngxAni.to(dom, 0, {
                        position: 'absolute',
                        left: '10%',
                    });
                    this.x = 10;

                    return;
                }

                this.x = this.x + 10;

                this.ngxAni.to(dom, .9, {
                    position: 'absolute',
                    left: '' + (this.x) + '%'
                });

                break;
        }

        this.animationImage = direction + '1';
        this.showArrows = false;

        setTimeout(() => {
            this.animationImage = direction + '2';
        }, 300);

        setTimeout(() => {
            this.animationImage = direction + '3';
        }, 600);

        setTimeout(() => {
            this.animationImage = direction + '1';
            this.showArrows = true;
            this.randomEncounter();
        }, 900);
    }

    checkForNextLoc(direction) {
        let mapQuery = this.mappingService.changeMaps(this.zone, direction);
        this.zone = mapQuery[0];
        let nextMapAvailable = mapQuery[1];

        return nextMapAvailable;
    }

    setCombatState(e) {
        this.inCombat = e;
    }
}