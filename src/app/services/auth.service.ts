import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import User from "../models/User";
import { DetailsModel } from "../models/my-details-model";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	authUrl: string = `${environment.baseUrl}/auth`;
	currentUser: User;

	constructor(private http: HttpClient) {}

	login(email: string, password: string): Observable<any> {
		const payload = { email: email, password: password };
		const res = this.http.post<any>(`${this.authUrl}/login`, payload, {
			headers: environment.headers,
			withCredentials: environment.withCredentials,
			observe: "response",
		});
		return res;
	}

	logout(): void {
		this.http.post(`${this.authUrl}/logout`, null).subscribe();
	}

	register(
		firstName: string,
		lastName: string,
		email: string,
		password: string
	): Observable<any> {
		const payload = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
		};
		return this.http.post<any>(`${this.authUrl}/register`, payload, {
			headers: environment.headers,
		});
	}

	retrieveMyDetails(): Observable<DetailsModel> {
		return this.http.get<DetailsModel>(`${this.authUrl}/user`, {
			headers: environment.headers,
			withCredentials: environment.withCredentials,
		});
	}

	retrieveUser(): Observable<User> {
		return this.http.get<User>(`${environment.baseUrl}/user`, {
			headers: environment.headers,
			withCredentials: environment.withCredentials,
		});
	}

	checkValidEmail(email: String): Observable<Boolean> {
		let body = {
			email: email,
		};
		return this.http.post<Boolean>(`${environment.baseUrl}/user`, body, {
			headers: environment.headers,
			withCredentials: environment.withCredentials,
		});
	}
}
