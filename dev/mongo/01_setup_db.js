db.createUser(
    {
        user: "webapp",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "blog"
            }
        ]
    }
);

db.createCollection("posts");
db.createCollection("users");