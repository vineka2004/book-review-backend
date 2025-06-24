const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../../server"); // import your Express app
const Review = require("../../models/Review");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Review.deleteMany(); // clean db before each test
});

describe("Integration Test - /reviews API", () => {
  it("POST /reviews should create a review", async () => {
    const res = await request(app)
      .post("/reviews")
      .send({
        bookId: new mongoose.Types.ObjectId(),
        user: "TestUser",
        rating: 5,
        comment: "Amazing Book!",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.comment).toBe("Amazing Book!");
  });

  it("GET /reviews should return all reviews", async () => {
    await Review.create({
      bookId: new mongoose.Types.ObjectId(),
      user: "A",
      rating: 4,
      comment: "Cool",
    });

    const res = await request(app).get("/reviews");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].user).toBe("A");
  });
});
