import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import User from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-user-card",
	templateUrl: "./user-card.component.html",
	styleUrls: ["./user-card.component.css"],
})
export class UserCardComponent implements OnInit {
	user: User = {} as User;
	firstName?: string;
	lastName?: string;
	email?: string;

	constructor(private authService: AuthService, private http: HttpClient) {}

	ngOnInit(): void {
		this.http
			.get("http://ec2-52-55-151-95.compute-1.amazonaws.com:8081/auth/user", {
				withCredentials: true,
				observe: "response",
			})
			.subscribe(
				(res: any) => {
					console.log(res);
					this.firstName = res.body.firstName;
					this.lastName = res.body.lastName;
					this.email = res.body.email;
				},
				(err) => {
					console.log(err);
				}
			);
	}
}
