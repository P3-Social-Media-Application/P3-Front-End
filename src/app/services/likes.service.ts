import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LikesModel } from '../models/likes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  _url = `${environment.baseUrl}/likes`

  constructor(private http: HttpClient) { }
  updateLikes(like: LikesModel) {
    return this.http.post<any>(`${environment.baseUrl}/likes/addlike`, like, { withCredentials: true, observe: "response" as "body" })
  }
}

