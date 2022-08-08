import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }

  private getHttpOptionWithLogin() {
    let userData = localStorage.getItem('token') || '{}';
    let headers = new HttpHeaders();
    headers = headers.append('authorization', userData);
    let options = { headers: headers };
    return options;
  }

  getUserList() {
    let authHeader = this.getHttpOptionWithLogin();
    return this.httpClient.get(`${environment.baseAPI}/getUserList`, authHeader)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => {
      return errorMessage;
    });
  }
}
