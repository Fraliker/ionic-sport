import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs';
import {Observable} from "rxjs";

@Injectable()
export class SmsService {

  private API_URL: string = "http://localhost";


  constructor(private http: Http) {
  }


  public checkSMSCode(code): Observable<boolean> {
    return this.http.get(this.API_URL, ).map(res => {
      return true;
    });
  }
}
