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

describe("Integration Test - /users API", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        username: "testuser",
        password: "securepassword",
        name: "Test User",
        bio: "Loves testing",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe("testuser");
    expect(res.body.name).toBe("Test User");
  });

  
  it("should return 400 if required fields are missing", async () => {
  const originalConsoleError = console.error;
  console.error = jest.fn(); // Suppress error output for this test

  const res = await request(app).post("/users").send({
    name: "Test",
  });

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("Failed to create user");

  console.error = originalConsoleError; // Restore console.error
});


  it("should fetch a user by ID", async () => {
    const newUser = await User.create({
      username: "olduser",
      password: "oldpass",
      name: "Fetch Me",
      bio: "Old bio",
    });

    const res = await request(app).get(`/users/${newUser._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Fetch Me");
  });

  it("should return 404 when fetching non-existent user", async () => {
    const res = await request(app).get(`/users/6482dfc9c4c5d9a8d4e8c1a0`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("User not found");
  });

  it("should update a user by ID", async () => {
    const user = await User.create({
      username: "olduser",
      password: "oldpass",
      name: "Old Name",
      bio: "Old bio",
    });

    const res = await request(app)
      .put(`/users/${user._id}`)
      .send({ name: "New Name", bio: "New bio" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("New Name");
    expect(res.body.bio).toBe("New bio");
  });

  it("should return 404 when updating a non-existent user", async () => {
    const res = await request(app)
      .put(`/users/6482dfc9c4c5d9a8d4e8c1a0`)
      .send({ name: "None", bio: "No bio" });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("User not found");
  });
});

