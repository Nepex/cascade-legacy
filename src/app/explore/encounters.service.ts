import { Injectable } from '@angular/core';

@Injectable()
export class EncountersService {
    enemies = [];

    constructor() { }

    detemineEncounter(randomNumber, zone) {
        let enemiesLimit4 = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
        let enemiesLimit3 = Math.floor(Math.random() * (3 - 0 + 1)) + 0;        
        let enemiesLimit2 = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
        
        this.enemies = [];

        // ritual grounds enemy encounters
        if (randomNumber <= 30 && zone.substring(0,15) === 'ritual-grounds') {
            this.createEnemyArray(enemiesLimit4, 'thunderhawk');
            return this.enemies;
        }

        // no conditions are met, don't enter combat
        else {
            return [];
        }
    }

    createEnemyArray(numberOfEnemies, enemy) {
        for (let i = 0; i < numberOfEnemies; i++) {
            this.enemies.push(enemy);
        }
    }

}