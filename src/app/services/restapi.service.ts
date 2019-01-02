import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  private backend_url: string
  constructor(public _http: HttpClient) {
    this.backend_url = 'http://localhost:9000'
  }
  public getGlobal<Object>(urlMethod: string, param: string, token?: string): Observable<Object> {
    console.log(this.backend_url + urlMethod)
    let tk = token ? token : '';
    return this._http.get<Object>(this.backend_url + urlMethod, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', tk),
      params: new HttpParams().set('param', param)
    })
  }

  public postGlobal<Object>(urlMethod: string, object: any, token?: string): Observable<Object> {
    let valor = JSON.stringify(object)
    let tk = token ? token : '';
    return this._http.post<Object>(this.backend_url + urlMethod, valor, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', tk)
    })
  }

  public deleteGlobal<Object>(urlMethod: string, code: string, token?: string): Observable<Object> {
    let tk = token ? token : '';
    return this._http.delete<Object>(this.backend_url + urlMethod + code, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', tk)
    })
  }

  public putGlobal<Object>(urlMethod: string, object: any, token?: string): Observable<Object> {
    let valor = JSON.stringify(object);
    let tk = token ? token : '';
    return this._http.put<Object>(this.backend_url + urlMethod, valor, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', tk)
    })
  }
}
