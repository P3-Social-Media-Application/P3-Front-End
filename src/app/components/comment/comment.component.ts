import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import Post from "src/app/models/Post";
import User from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";
import "leo-profanity";

@Component({
	selector: "app-comment",
	templateUrl: "./comment.component.html",
	styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
	commentForm = new FormGroup({
		text: new FormControl(""),
	});

	@Input("comment") inputComment: Post;
	replyToComment: boolean = false;
	editPost: boolean = false;

	@Input()
	currentUser: User;

	@Output()
	deleteCommentEvent = new EventEmitter();

	@Output()
	commentEventEmitter = new EventEmitter();

	constructor(
		private postService: PostService,
		private authService: AuthService
	) {}

	ngOnInit(): void {}

	toggleReplyToComment = () => {
		this.replyToComment = !this.replyToComment;
		//this.editPost = false;
	};

	toggleEditPost = () => {
		this.editPost = !this.editPost;
		//this.replyToComment = false;
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
				...this.inputComment,
				comments: [...this.inputComment.comments, newComment],
			})
			.subscribe((response) => {
				this.inputComment = response;
				this.toggleReplyToComment();
				this.commentEventEmitter.emit(true);
			});
	};

	deleteComment = (post: Post) => {
		if (window.confirm("Are sure you want to remove your comment?")) {
			this.postService.deleteComment(post).subscribe(
				(data) => {
					this.deleteCommentEvent.emit(true);
					this.refreshComments(true);
				},
				(error) => {
					console.log("ERROR IN deleteComment");
					console.log(error);
				}
			);
		}
	};

	refreshComments = (refresh: boolean) => {
		this.deleteCommentEvent.emit(refresh);
	};

	submitEditedPost = (e: any) => {
		e.preventDefault();
		const Filter = require("leo-profanity");
		let newPost = new Post(
			this.inputComment.id,
			Filter.clean(this.commentForm.value.text || ""),
			"",
			this.currentUser,
			this.inputComment.comments,
			true
		);
		this.postService.updatePost(newPost).subscribe((response) => {
			this.inputComment = response;
			this.toggleEditPost();
		});
	};
}
