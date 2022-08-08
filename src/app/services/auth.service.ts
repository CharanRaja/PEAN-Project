import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public isAuthenticated(): boolean {
    const token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return true;
  }

  login(user: any): Observable<any> {
    return this.httpClient.post(`${environment.baseAPI}/login`, user)
      .pipe(retry(1), catchError(this.handleError));
  }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${environment.baseAPI}`, user)
      .pipe(retry(1), catchError(this.handleError));
  }

  checkEmailExists(user: any): Observable<any> {
    return this.httpClient.post(`${environment.baseAPI}/checkEmailExists`, user)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error) {
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
