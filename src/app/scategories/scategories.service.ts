import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ScategoriesService {

  private apiURL = 'https://my-resto-nodejs-emnaabbes.vercel.app/api'

    httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }

 constructor(private httpClient: HttpClient) { }

   
  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/categories/')

    .pipe(

      catchError(this.errorHandler)

    )

  }

  errorHandler(error:any) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    return throwError(errorMessage);

 }
}
