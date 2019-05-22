export interface Post {
    id: string;
    title: string;
    linkText: string;
    previewText: string;
    fullText: string;
    publishedAt?: Date;
    tags?: Tag[];
    isPublished?: boolean;
}

export interface Tag {
    name: string;
}