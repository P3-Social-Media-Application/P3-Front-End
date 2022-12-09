import User from "./User"

export default class Post {
    id: number
    text: string
    imageUrl: string
    author: User
    comments: Post[]
    comment: boolean

    constructor (id: number, text: string, imageUrl: string, author: User, comments: Post[], isComment: boolean) {
        this.id = id
        this.text = text
        this.imageUrl = imageUrl
        this.author = author
        this.comments = comments
        this.comment = isComment
    }
}