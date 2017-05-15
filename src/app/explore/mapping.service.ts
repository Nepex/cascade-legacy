import { Injectable } from '@angular/core';

@Injectable()
export class MappingService {
    constructor() { }

    changeMaps(zone, direction) {

        // ritual grounds mapping
        if (zone === 'ritual-grounds' && direction === 'north') {
            return ['ritual-grounds-n1', true];
        }

        else if (zone === 'ritual-grounds-n1' && direction === 'south') {
            return ['ritual-grounds', true];
        }


        // if map doesn't continue, return current map
        else {
            return [zone, false];
        }

    }

}
