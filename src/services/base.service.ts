import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class BaseService {
  constructor(private http: HttpClient) {
  }

  protected Get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, {
      headers: this.getHeaders()
    });
  }

  protected Post<Treq, Tres>(url: string, reqModel: Treq): Observable<Tres> {
    return this.http.post<Tres>(url, reqModel, {
      headers: this.getHeaders()
    });
  }

  protected Put<Treq>(url: string, reqModel: Treq): Observable<Treq> {
    return this.http.put<Treq>(url, reqModel, {
      headers: this.getHeaders()
    });
  }

  protected Delete<Treq>(url: string): Observable<Treq> {
    return this.http.delete<Treq>(url, {
      headers: this.getHeaders()
    });
  }

  public getHeaders(): HttpHeaders {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return headers;
  }
}
