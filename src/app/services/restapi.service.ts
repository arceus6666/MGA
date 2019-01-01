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
  public getGlobal<Object>(urlMethod: string, token: string, param: string): Observable<Object> {
    console.log(this.backend_url + urlMethod)
    return this._http.get<Object>(this.backend_url + urlMethod, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', token),
      params: new HttpParams().set('param', param)
    })
  }

  public postGlobal<Object>(object: any, urlMethod: string, token: string): Observable<Object> {
    let valor = JSON.stringify(object)
    return this._http.post<Object>(this.backend_url + urlMethod, valor, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', token)
    })
  }

  public deleteGlobal<Object>(code: string, urlMethod: string, token: string): Observable<Object> {
    return this._http.delete<Object>(this.backend_url + urlMethod + code, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', token)
    })
  }

  public putGlobal<Object>(object: any, urlMethod: string, token: string): Observable<Object> {
    let valor = JSON.stringify(object)
    return this._http.put<Object>(this.backend_url + urlMethod, valor, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', token)
    })
  }
}
