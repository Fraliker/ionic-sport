import {Injectable} from '@angular/core';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/operator/map';

@Injectable()
export class AuthService {

  private API_URL: string = "http://localhost";

  constructor(private http: Http) {

  }

  /**
   * @param name
   * @param phone
   * @return {Observable<boolean>}
   */
  public login(name: string, phone: string): Observable<boolean> {

    // return Observable.create();

    return this.http.post((this.API_URL + "auth/signin"), JSON.stringify({name: name, phone: phone}))
      .map((res) => {
        console.log(res);
        return true;
      });
  }

}
