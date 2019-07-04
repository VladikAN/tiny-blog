/* Upsert user for development purposes. Username: admin, Password: admin */
db.users.update({ username: "admin" }, { $set: {
        username: "admin",
        email: "admin@domain.com",
        passwordHash: "rWt1hG18e/3V6ShmwEHW7UZyXU0f5CtRAVZz4MmwAEA=",
        passwordSalt: "y+56USuj6xTRtTa8ln5AAw==",
        isActive: true,
        isSuper: true
    }
}, { upsert: true });