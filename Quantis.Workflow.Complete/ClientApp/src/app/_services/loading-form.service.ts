import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Headers from '../_helpers/headers';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingFormService {

  constructor(private http: HttpClient) { }

  getLoadingForms(): Observable<any>{
    const loadingFormEndPoint = `${environment.API_URL}/oracle/GetForms`  
    return this.http.get(loadingFormEndPoint, Headers.setHeaders('GET'));
  }
  
  getKpiByFormId(form_id:number): Observable<any> {
    const getKpiByFormIdEndPoint = `${environment.API_URL}/Data/GetKpiByFormId/${form_id}`;
    return this.http.get(getKpiByFormIdEndPoint, Headers.setHeaders('GET'));
  }

  public getFormFilterById(form_id:number): Observable<any> {
    const getFormFilterByIdEndPoint = `${environment.API_URL}/Data/GetFormById/${form_id}`
    return this.http.get(getFormFilterByIdEndPoint, Headers.setHeaders('GET'));
  }

}
