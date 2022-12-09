import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import User from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";

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
			.get("http://localhost:8080/auth/user", {
				withCredentials: true,
				observe: "response",
			})
			.subscribe(
				(res: any) => {
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
