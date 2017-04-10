import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SessionStateService } from './session-state.service';


@Injectable()
export class AuthenticatedHttpService extends Http {

  constructor(backend: XHRBackend, private router: Router, defaultOptions: RequestOptions, private sessionStateService: SessionStateService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch((error: Response) => {
      if (error.status === 401 && this.router.url !== '/login') {
        this.sessionStateService.logout();
        this.router.navigate(['/login']);
      }
      // else if (error.status === 403) {

      // }
      return Observable.throw(error);
    });
  }
}