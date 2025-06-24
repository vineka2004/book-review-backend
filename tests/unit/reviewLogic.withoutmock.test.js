const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Review = require("../../models/Review");
const { fetchReviews, createReview } = require("../../reviewLogic");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Review Logic - Real DB (No Mock)", () => {
  it("creates and fetches a review", async () => {
    const bookObjectId = new mongoose.Types.ObjectId(); // ✅ valid ObjectId

    const data = {
      bookId: bookObjectId,
      user: "RealUser",
      rating: 5,
      comment: "This is real test",
    };

    const created = await createReview(data);
    expect(created.comment).toBe("This is real test");

    const fetched = await fetchReviews(bookObjectId);
    expect(fetched.length).toBe(1);
    expect(fetched[0].user).toBe("RealUser");
  });
});
