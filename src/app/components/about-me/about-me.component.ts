import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { aboutMe } from "src/app/models/aboutme";
import User from "src/app/models/User";
import { AboutInfoService } from "src/app/services/about-info.service";
import { AuthService } from "src/app/services/auth.service";
import "leo-profanity";

@Component({
	selector: "app-about-me",
	templateUrl: "./about-me.component.html",
	styleUrls: ["./about-me.component.css"],
})
export class AboutMeComponent implements OnInit {
	aboutMe: FormGroup;
	submitted = false;
	myInfo?: string;
	currentUser: User;

	constructor(
		private http: HttpClient,
		private aboutInfo: AboutInfoService,
		private formBuilder: FormBuilder,
		private userService: AuthService
	) {
		this.aboutMe = this.formBuilder.group({
			aboutMe: ["", [Validators.required]],
		});
	}

	ngOnInit(): void {
		this.aboutInfo.getInfo().subscribe(
			(res: any) => {
				this.myInfo = res.body.about_Me;
				this.submitted = true;
			},
			(err) => {
				console.log(err);
			}
		);
		this.userService.retrieveUser().subscribe(
			(response: any) => {
				this.currentUser = response;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	onEdit() {
		this.submitted = false;
	}

	onSubmit() {
		this.submitted = true;
		const Filter = require("leo-profanity");
		let info = new aboutMe(
			this.currentUser.id,
			Filter.clean(this.aboutMe.value.aboutMe)
		);
		this.aboutInfo.submit(info).subscribe((data) => {
			this.myInfo = Filter.clean(this.aboutMe.value.aboutMe);
		});
	}
}
