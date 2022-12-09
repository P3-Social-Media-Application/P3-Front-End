import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PassModel } from '../models/pass-model';
@Injectable({
  providedIn: 'root'
})
export class ChangePassService {

  _url= 'http://localhost:8080/auth/change-password'
  constructor(private _http: HttpClient) { }
  
  change(passModel:PassModel) {

    return  this._http.post<any>(this._url, passModel, {withCredentials: true , observe: "response" as "body"} )
     
  }
}