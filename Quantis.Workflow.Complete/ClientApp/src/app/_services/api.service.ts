import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCatalogoUsers(){
    return this.http.get('https://api.myjson.com/bins/p7x9t').pipe(
      tap(
        data => data,
        error => error
      )
    );
  }

  getCatalogoKpis(){
    return this.http.get('https://api.myjson.com/bins/1157o5')
      .pipe(
        tap(
          data => data,
          error => error
        )
      );
  }

  getConfigurations() {
    return this.http.get('https://api.myjson.com/bins/13h29l')
      .pipe(
        tap(
          data => data,
          error => error
        )
      );
  }
}
