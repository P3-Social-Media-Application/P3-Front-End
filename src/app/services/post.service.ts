import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Post from "../models/Post";


@Injectable({
	providedIn: "root",
})
export class PostService {
	postUrl: string = `${environment.baseUrl}/post`;

	constructor(private http: HttpClient) {}

	getAllPosts(): Observable<Post[]> {
		return this.http.get<Post[]>(`${this.postUrl}`, {
			headers: environment.headers,
			withCredentials: environment.withCredentials,
		});
	}

	upsertPost(post: Post): Observable<Post> {
		return this.http.put<Post>(`${this.postUrl}`, post, {
			headers: environment.headers,
			withCredentials: environment.withCredentials,
		});
	}

	deletePost(post: Post): Observable<any> {
		return this.http.post<Post>(`${this.postUrl}`, post, {
			headers: environment.headers,
			withCredentials: environment.withCredentials,
		});
	}

	deleteComment(post: Post): Observable<any> {
		return this.http.post<Post>(`${this.postUrl}/comment`, post, {
			headers: environment.headers,
			withCredentials: environment.withCredentials,
		});
	}

	updatePost(post: Post): Observable<Post> {
		return this.http.put<Post>(`${this.postUrl}`, post, {
			headers: environment.headers,
			withCredentials: environment.withCredentials,
		});
	}
}
