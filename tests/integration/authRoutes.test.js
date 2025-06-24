// tests/integration/authRoutes.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../../server");
const User = require("../../models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Integration Test - /auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/auth").send({
      username: "newuser",
      password: "newpass",
      name: "New User",
      bio: "New bio",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.username).toBe("newuser");
  });

  it("should not register user with missing credentials", async () => {
    const res = await request(app).post("/auth").send({ name: "Incomplete" });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Username and password are required");
  });

  it("should prevent duplicate username registration", async () => {
    await User.create({ username: "existing", password: "123" });

    const res = await request(app).post("/auth").send({
      username: "existing",
      password: "456",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe("Username already exists");
  });

  it("should login a user successfully", async () => {
    await User.create({ username: "loginuser", password: "pass", name: "U" });

    const res = await request(app).post("/auth/login").send({
      username: "loginuser",
      password: "pass",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(" Login successful");
  });

  it("should reject login with wrong password", async () => {
    await User.create({ username: "wrongpass", password: "right" });

    const res = await request(app).post("/auth/login").send({
      username: "wrongpass",
      password: "wrong",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Invalid username or password");
  });
});
