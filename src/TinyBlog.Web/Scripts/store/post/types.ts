export interface Post {
    title: string,
    linkText: string,
    previewText: string,
    fullText: string,
    publishedAt: Date,
    tags: Tag[]
}

export interface Tag {
    name: string
}