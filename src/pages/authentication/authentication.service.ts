import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs';


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

    return this.http.post((this.API_URL + "auth/signin"), JSON.stringify({name: name, phone: phone}))
      .map((res) => {
        console.log(res);
        return true;
      });
  }

}
