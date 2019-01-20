import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private baseSerive: BaseService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    // if(!req.url.includes('token'))
    //  {
    //  const authReq = req.clone({headers: this.baseSerive.getHeaders()});
    //  return next.handle(authReq);
    //  }
   
    return next.handle(req.clone())
  }
}
