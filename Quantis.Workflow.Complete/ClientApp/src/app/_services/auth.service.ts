import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as sha256 from 'sha256';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>; // Danial: To use for reactively updating UI login.
  // Danial TODO: replace any with user model in future
  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(this.getUser());
      this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const hashedPassword: string = sha256('p4ssw0rd'+sha256(password));
    // Danial TODO: move headers code into custom HTTP Interceptor class
    let headerObject = new HttpHeaders().set('Content-Type', 'application/json');
    headerObject = headerObject.append('Content-Type', 'application/json');
    headerObject = headerObject.append("Authorization", "Basic " + btoa("Quantis:WorkflowAPI"));
    headerObject = headerObject.append("Authorization-Type", "Preemptive");
    headerObject = headerObject.append('Access-Control-Allow-Headers', 'Content-Type');
    headerObject = headerObject.append('Access-Control-Allow-Methods', 'GET');
    headerObject = headerObject.append('Access-Control-Allow-Origin', '*');

    // Danial TODO: move endpoint into separat constant file
    const loginEndPoint = `${environment.API_URL}/Data/Login?username=${username}&password=${hashedPassword}`;
    return this.http.get<any>(loginEndPoint, {headers: headerObject})
        .pipe(map(user => {
          console.log('user ==>', user);
            if (!!user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : false;
  }

  isLoggedIn(): boolean {
      return !!this.getUser();
  }
}
