import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Headers from '../_helpers/headers';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingFormService {

  constructor(private http: HttpClient) { }

  getLoadingForms(){
    const loadingFormEndPoint = `${environment.API_URL}/oracle/GetForms`  
    return this.http.get(loadingFormEndPoint, Headers.setHeaders('GET'));
  }
}
