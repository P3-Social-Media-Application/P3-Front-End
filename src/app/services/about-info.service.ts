import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { aboutMe } from '../models/aboutme';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutInfoService {

  _url= `${environment.baseUrl}/about/about-info`
  constructor(private _http: HttpClient) { }
  
  submit(info : aboutMe) {
    return this._http.post<any>(this._url, info, {withCredentials: true , observe: "response" as "body"} )
  }
  
  getInfo(){
    return this._http
    .get(`${environment.baseUrl}/about/get-info`, {
      withCredentials: true,
      observe: "response" as "body",
    })
  }
}
