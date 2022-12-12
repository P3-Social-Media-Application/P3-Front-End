import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PassModel } from '../models/pass-model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChangePassService {

  _url= `${environment.baseUrl}/auth/change-password`
  constructor(private _http: HttpClient) { }
  
  change(passModel:PassModel) {

    return  this._http.post<any>(this._url, passModel, {withCredentials: true , observe: "response" as "body"} )
     
  }
}