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

print('User created');