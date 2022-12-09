import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
	registerForm = new FormGroup({
		firstName: new FormControl(""),
		lastName: new FormControl(""),
		email: new FormControl(""),
		password: new FormControl(""),
	});

	errorMessage: String;
	validEmail: Boolean;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	onSubmit(e: any): void {
		e.preventDefault();
		this.validEmail = false;
		this.authService
			.checkValidEmail(this.registerForm.value.email || "")
			.subscribe((response) => {
				this.validEmail = response;
			});
		setTimeout(() => {
			if (this.validEmail) {
				this.errorMessage = "Email address is taken";
			} else {
				this.authService
					.register(
						this.registerForm.value.firstName || "",
						this.registerForm.value.lastName || "",
						this.registerForm.value.email || "",
						this.registerForm.value.password || ""
					)
					.subscribe((response) => {
						this.router.navigate(["login"]);
					});
			}
		}, 250);
	}
}
