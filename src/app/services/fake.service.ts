import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakeService {

  constructor(private http: HttpClient) { }

  getDataV1(): Observable<any>{
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http.get(url);
  }

  getDataV2(): Observable<any>{
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http.get(url).pipe(
      tap(data => console.log('data fetched', data)),
      catchError(this.handleError('failed to fetch data'))
    );
  }

  handleError<T>(opeartion = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.log(error);
      const message = `server returned code ${error.status} with body "${error.error}"`;
      throw new Error(`${opeartion} failed: ${message}`);
    }
  }

  postDataV1(data: any): Observable<any>{
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(data, url, httpOptions);
  }


}
