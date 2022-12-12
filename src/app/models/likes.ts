export class LikesModel {

    constructor(
        public ID: number,
        public postID: number,
        public likedBy: string,
    ) { }
}