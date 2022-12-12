export class LikesModel {

    constructor(
        public ID :number,
        public postID: number,
        public likeCount: number,
        public likedBy: string,
        
    ){}
  }