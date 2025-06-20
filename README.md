# 📚 Book Review Backend

This is the Express.js backend for the **Book Review Platform**. It provides APIs for user authentication, book listings, and review submissions.

## 🌐 Live API URL  
👉 https://book-review-backend-kq9i.onrender.com

## 🛠️ Tech Stack

- 🟩 Node.js  
- ⚙️ Express.js  
- 🍃 MongoDB Atlas (via Mongoose)  
- 🚀 Render for backend hosting

## ⚙️ Setup Instructions

Clone the repository, install dependencies, create a `.env` file, and run the server:

```bash
git clone https://github.com/vineka2004/book-review-backend.git
cd book-review-backend
npm install
```

Create a `.env` file in the root directory with the following content:

```
MONGO_URI=mongodb+srv://vineka:vineka@cluster0.bbbcav1.mongodb.net/bookreviewdb?retryWrites=true&w=majority&appName=Cluster0
PORT=5000

```

Start the server:

```bash
npm start
```

Then open http://localhost:5000 to verify it's working.

## 📌 Features

- 👤 User registration and login  
- 📚 Book management API  
- ✍️ Add and fetch reviews  
- 🌐 RESTful endpoints

