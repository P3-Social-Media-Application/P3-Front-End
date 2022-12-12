import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit {

  firstName?: string;
	lastName?: string;
	email: string | null;
  id?: number;
  myInfo? : string;
  constructor(private activatedRoute : ActivatedRoute,
    private http : HttpClient) { }

  
    getUserInfo(){
      this.http.get(`${environment.baseUrl}/about/get-info/${this.id}`, {withCredentials: true ,observe : "response"}).subscribe(
        (res : any ) => {
          
          this.myInfo = res.body.about_Me
          
          
          
        },
        err => {
          console.log(err);
        }
       )
    }
  
    ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.paramMap.get('email');
    console.log(this.email);

    this.http
			.get(`${environment.baseUrl}/user/friend/${this.email}`, {
				withCredentials: true,
				observe: "response",
			})
			.subscribe(
				(res: any) => {
          console.log(res);
					this.firstName = res.body.firstName;
          this.lastName = res.body.lastName;
          this.id = res.body.id;
          this.getUserInfo()
          console.log(this.myInfo)
				},
				(err) => {
					console.log(err);
				}
			);

  }
 

}