db.posts.insert({
    title: "Hello World",
    linkText: "hello-world",
    previewText: "**TinyBlog** is using markdown for text render.",
    publishedAt: new Date(),
    fullText: "Source code is open and availble on [github.com](https://github.com/VladikAN/tiny-blog).",
    isPublished: true,
    tags: ["hello", "tinyblog", "open-source"]
});