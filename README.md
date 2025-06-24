# 📚 Book Review App - Backend

This is the backend server for the **Book Review App**, built with **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs for user authentication, book management, and reviews.

---

## 🚀 Features

- 📖 CRUD operations for books and reviews
- 👤 User registration, login, profile update
- ✅ API integration with frontend
- 🧪 Unit and Integration testing using Jest & Supertest
- 📈 Code coverage: **85%**

---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **MongoDB** with Mongoose
- **Jest** and **Supertest** for testing
- **MongoMemoryServer** for in-memory DB during tests

---

## 📂 Project Structure

```
book-review-backend/
│
├── models/             # Mongoose schemas for User, Book, Review
├── routes/             # API route handlers (auth, users, books, reviews)
├── tests/              # Unit and integration test files
├── server.js           # Entry point of the backend app
├── reviewLogic.js      # Business logic (used in unit tests)
└── package.json        # Dependencies and scripts
```

---

## 🔌 API Endpoints

### 🔐 Auth
- `POST /auth` - Register new user
- `POST /auth/login` - Login user

### 📚 Books
- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `POST /books` - Add new book

### 💬 Reviews
- `GET /reviews?bookId=BOOK_ID` - Get reviews for a book
- `POST /reviews` - Add a new review

### 👤 Users
- `POST /users` - Create user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user profile

---

## 🧪 How to Run Tests

### ✅ Run All Tests & Check Coverage

```bash
npm install
npm test
```

> Coverage summary will appear in terminal and detailed report in `coverage/lcov-report/index.html`

### 🧪 Test Types Covered

- **Unit Tests**
  - Logic tested with and without mocking MongoDB
- **Integration Tests**
  - End-to-end testing of API + DB interaction
- **API Tests**
  - CRUD endpoints tested using Supertest

---
## 📊 Coverage Screenshot

![coverage](https://github.com/user-attachments/assets/deed6dfb-516f-47b9-ba53-ed9c3ad87167)



---

## ⚙️ Running Locally

```bash
npm install
npm start
```

Make sure you have MongoDB running locally or update your `.env` with your Atlas connection string.

---

## 📦 Scripts

| Command        | Description                 |
|----------------|-----------------------------|
| `npm start`    | Run the backend server      |
| `npm test`     | Run all tests with coverage |


---


