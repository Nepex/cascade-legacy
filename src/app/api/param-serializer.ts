import { URLSearchParams } from '@angular/http';

export class ParamSerializer {
    serialize(obj: any, params?: URLSearchParams, prefix?: string): URLSearchParams {

        if (params === null || params === undefined) {
            params = new URLSearchParams();
        }

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let element = obj[key];

                if (Array.isArray(element)) {
                    for (let i = 0; i < element.length; i++) {
                        let keyName = prefix ? prefix + '.' + key : key;
                        params.append(keyName, element[i]);

                    }
                } else if (typeof (element) === 'undefined' || element === null) {
                    if (typeof element === 'number') {
                        element = 0;
                    } else if (typeof element === 'string') {
                        element = '';
                    }

                    continue;
                } else if (typeof (element) === 'object') {
                    let keyName = prefix ? prefix + '.' + key : key;
                    this.serialize(element, params, keyName);

                } else {
                    let keyName = prefix ? prefix + '.' + key : key;

                    params.set(keyName, element);
                }
            }
        }
        return params;
    }
}