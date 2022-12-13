import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import Post from "src/app/models/Post";
import User from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";
import "leo-profanity";

@Component({
	selector: "app-post-feed-page",
	templateUrl: "./post-feed-page.component.html",
	styleUrls: ["./post-feed-page.component.css"],
})
export class PostFeedPageComponent implements OnInit {
	postForm = new FormGroup({
		text: new FormControl(""),
		imageUrl: new FormControl(""),
	});

	posts: Post[] = [];
	createPost: boolean = false;
	currentUser: User;

	constructor(
		private postService: PostService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.postService.getAllPosts().subscribe((response) => {
			this.posts = response
				.filter((post) => post.comment == false)
				.sort((postA, postB) => postB.id - postA.id);
				
		});

		this.authService.retrieveUser().subscribe((response) => {
			this.currentUser = response;
		});
	}

	toggleCreatePost = () => {
		this.createPost = !this.createPost;
	};

	submitPost = (e: any) => {
		if(this.postForm.value.imageUrl?.includes('www.youtube.com')){
			let urlLength= this.postForm.value.imageUrl.length;  
			let videoID=this.postForm.value.imageUrl.substring(urlLength-11)  //last 11 characters should be the id of video
			this.postForm.get('imageUrl')?.setValue(`https://www.youtube.com/embed/${videoID}`); 
		}
		e.preventDefault();
		const Filter = require("leo-profanity");
		this.postService
			.upsertPost(
				new Post(
					0,
					Filter.clean(this.postForm.value.text || ""),
					this.postForm.value.imageUrl || "",
					this.currentUser,
					[],
					false
				)
			)
			.subscribe((response) => {
				this.postForm = new FormGroup({
					text: new FormControl(""),
					imageUrl: new FormControl(""),
				});
				this.refreshPosts(true);
				this.toggleCreatePost();
			});
	};

	refreshPosts = (deleteBool: boolean) => {
		if (deleteBool) {
			this.postService.getAllPosts().subscribe((response) => {
				this.posts = response
					.filter((post) => post.comment == false)
					.sort((postA, postB) => postB.id - postA.id);
			});
		}
	};
}
