import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { aboutMe } from '../models/aboutme';

@Injectable({
  providedIn: 'root'
})
export class AboutInfoService {

  _url= 'http://ec2-52-55-151-95.compute-1.amazonaws.com:8081/about/about-info'
  constructor(private _http: HttpClient) { }
  
  submit(info : aboutMe) {
    return this._http.post<any>(this._url, info, {withCredentials: true , observe: "response" as "body"} )
  }
  
  getInfo(){
    return this._http
    .get("http://ec2-52-55-151-95.compute-1.amazonaws.com:8081/about/get-info", {
      withCredentials: true,
      observe: "response" as "body",
    })
  }
}
