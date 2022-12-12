import { outputAst } from "@angular/compiler";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import Post from "src/app/models/Post";
import User from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";
import { LikesModel } from "src/app/models/likes";
import "leo-profanity";
import { HttpClient } from "@angular/common/http";
import { LikesService } from "src/app/services/likes.service";
import { resolveSoa } from "dns";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-post",
	templateUrl: "./post.component.html",
	styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
	commentForm = new FormGroup({
		text: new FormControl(""),
	});
	postForm = new FormGroup({
		text: new FormControl(""),
		imageUrl: new FormControl(""),
	});

	@Input("post") post: Post;
	replyToPost: boolean = false;
	editPost: boolean = false;

	@Input()
	currentUser: User;
	likeModel: any = {};
	public set value(user: User) {
		this.currentUser = user;
	}

	@Output()
	deletePostEvent = new EventEmitter();

	constructor(
		private postService: PostService,
		private authService: AuthService,
		private http: HttpClient,
		private likes: LikesService
	) { }



	palleteColor = "primary";
	likecount?: number;
	canLike?: boolean;
	postid?: number;
	userLiked?: any[];

	getLikes() {

		this.http.get(`${environment.baseUrl}/likes/getlikes/${this.postid}`, { withCredentials: true, observe: "response" }).subscribe(
			(res: any) => {
				console.log(res)
				this.likecount = res.body.length;
				this.userLiked = res.body;

			},
			err => {
				console.log(err);
			}
		)
	}

	change() {
		this.palleteColor = "warn"
		let element = document.getElementById(`likeButton${this.postid}`);
		element?.setAttribute("disabled", "true");

		this.likeModel.likedBy = this.currentUser.email;
		this.likeModel.postID = this.post.id;
		this.postid = this.post.id;

		this.likes.updateLikes(this.likeModel).subscribe
			((data) => {
				this.getLikes();
			},
				(error) => {
					console.log(error);

				}
			)
	}



	ngOnInit(): void {

		this.postid = this.post.id
		this.getLikes();
		let matchedUser = null;
		setTimeout(() => {
			matchedUser = this.userLiked?.find((like) => like.likedBy == this.currentUser.email)

			if (matchedUser) {
				let element = document.getElementById(`likeButton${this.postid}`);
				element?.setAttribute("disabled", "true");
				this.palleteColor = "warn"
			}
		}, 100)





	}

	ngOnChanges() {

	}

	toggleReplyToPost = () => {
		this.replyToPost = !this.replyToPost;
	};

	toggleEditPost = () => {
		this.editPost = !this.editPost;
		this.replyToPost = false;
	};

	submitReply = (e: any) => {
		e.preventDefault();
		const Filter = require("leo-profanity");
		let newComment = new Post(
			0,
			Filter.clean(this.commentForm.value.text || ""),
			"",
			this.currentUser,
			[],
			true
		);
		this.postService
			.upsertPost({
				...this.post,
				comments: [...this.post.comments, newComment],
			})
			.subscribe((response) => {
				this.post = response;
				this.toggleReplyToPost();
			});
		window.location.reload();
	};

	deletePost = (post: Post) => {
		if (window.confirm("Are sure you want to remove your comment?")) {
			this.postService.deletePost(post).subscribe();
			setTimeout(() => {
				this.deletePostEvent.emit(true);
			}, 250);
		}
	};

	refreshPosts = (refresh: boolean) => {
		this.deletePostEvent.emit(refresh);
	};

	submitEditedPost = (e: any) => {
		e.preventDefault();
		const Filter = require("leo-profanity");
		let newPost = new Post(
			this.post.id,
			Filter.clean(this.postForm.value.text || ""),
			this.postForm.value.imageUrl || "",
			this.currentUser,
			this.post.comments,
			false

		);
		this.postService.updatePost(newPost).subscribe((response) => {
			this.post = response;
			this.toggleEditPost();
		});
	};
}
