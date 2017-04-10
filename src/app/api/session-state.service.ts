import { Injectable, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';

@Injectable()
export class SessionStateService {

    public static KEY_TOKEN: string = 'token';

    public onLogin: EventEmitter<void> = new EventEmitter<void>();
    public onLogout: EventEmitter<void> = new EventEmitter<void>();

    currentToken: string;

    constructor(private storage: LocalStorageService) {
        this.activate();
    }

    activate() {
        this.currentToken = this.storage.retrieve(SessionStateService.KEY_TOKEN);

        if (this.currentToken) {
            this.onLogin.emit();
        }
    }

    public getToken() {
        return this.currentToken;
    }

    public isAuthenticated() {
        return this.currentToken ? true : false;
    }

    public logout() {
        // this.cacheManagerService.clearCache();
        this.storage.clear(SessionStateService.KEY_TOKEN);
        this.currentToken = null;
        this.onLogout.emit();
    }

    public login(token: string) {
        this.currentToken = token;
        this.storage.store(SessionStateService.KEY_TOKEN, token);
        this.onLogin.emit();

        // http://stackoverflow.com/questions/13292744/why-isnt-localstorage-persisting-in-chrome
        this.storage.retrieve(SessionStateService.KEY_TOKEN);
    }
}