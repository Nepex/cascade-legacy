import { Injectable } from '@angular/core';

@Injectable()
export class EncountersService {
    enemies = [];

    constructor() { }

    detemineEncounter(randomNumber, zone) {
        let enemiesLimit4 = Math.floor(Math.random() * 4 + 1);
        let enemiesLimit3 = Math.floor(Math.random() * 3 + 1);
        let enemiesLimit2 = Math.floor(Math.random() * 2 + 1);
        let enemiesLimit1 = 1;

        this.enemies = [];

        // ritual grounds enemy encounters
        if (randomNumber <= 30 && zone.substring(0, 14) === 'ritual-grounds') {
            this.createEnemyArray(3, 'thunderhawk');
        }

        return this.enemies;
    }

    createEnemyArray(numberOfEnemies, enemy) {
        for (let i = 0; i < numberOfEnemies; i++) {
            this.enemies.push(enemy);
        }
    }

}