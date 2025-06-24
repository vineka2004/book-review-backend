// tests/integration/bookRoutes.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../../server");
const Book = require("../../models/Book");

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
  await Book.deleteMany();
});

describe("Integration Test - /books API", () => {
  it("should fetch all books", async () => {
    await Book.create({ title: "Book One", author: "Author A", genre: "Fiction", description: "desc" });
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Book One");
  });

  it("should fetch a book by ID", async () => {
    const newBook = await Book.create({
      title: "Book Fetch",
      author: "Fetcher",
      genre: "Sci-Fi",
      description: "Interesting book",
    });

    const res = await request(app).get(`/books/${newBook._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Book Fetch");
  });

  it("should return 404 for non-existing book ID", async () => {
    const res = await request(app).get(`/books/${new mongoose.Types.ObjectId()}`);
    expect(res.statusCode).toBe(404);
  });

  it("should create a new book", async () => {
    const bookData = {
      title: "New Book",
      author: "Author B",
      genre: "Drama",
      description: "A great read",
      coverImage: "image.jpg",
    };

    const res = await request(app).post("/books").send(bookData);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("New Book");
    expect(res.body.genre).toBe("Drama");
  });

  it("should return 400 if book creation fails", async () => {
    const res = await request(app).post("/books").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Failed to add book");
  });
});
