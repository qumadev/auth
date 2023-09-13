import { Injectable } from '@angular/core';
import {LoginI} from '../../models/login.interface';
import {ResponseI} from '../../models/response.interface';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

/* */
import {  HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://159.65.96.86:8080/"

  errorOccurred: boolean = false;
  errorMessage: string = '';

  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let uri = this.url + "services/auth/signin"
    return this.http.post<ResponseI>(uri,form)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejar el error de la solicitud HTTP
        this.errorOccurred = true;
        this.errorMessage = 'Ocurrió un error en la solicitud HTTP. Por favor, inténtalo de nuevo más tarde.';
        return throwError('Credenciales incorrectas, inténtalo de nuevo...');
      })
    )
  }

}
