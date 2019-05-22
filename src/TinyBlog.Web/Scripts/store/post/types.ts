export interface Post {
    id: string;
    title: string;
    linkText: string;
    previewText: string;
    fullText: string;
    publishedAt?: Date;
    tags?: string[];
    isPublished?: boolean;
}