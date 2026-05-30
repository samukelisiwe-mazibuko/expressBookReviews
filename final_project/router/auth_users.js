const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    return users.some(user => user.username === username);
  };
  
const authenticatedUser = (username, password) => {
    return users.some(
        user => user.username === username && user.password === password
    );
};

// only registered users can login
regd_users.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }
  
    if (users.some(u => u.username === username)) {
      return res.status(409).json({ message: "User already exists" });
    }
  
    users.push({ username, password });
  
    return res.status(200).json({ message: "User registered successfully" });
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

    const username = req.session.authorization?.username;
    const isbn = req.params.isbn;
    const review = req.query.review;

    if (!username) {
      return res.status(403).json({
        message: "User not logged in"
      });
    }

    books[isbn].reviews[username] = review;

    return res.status(200).json({
      message: "Review added/modified successfully",
      reviews: books[isbn].reviews
    });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {

  const username = req.session.authorization.username;
  const isbn = req.params.isbn;

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
  }

  return res.status(200).json({
    message: "Review deleted successfully"
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;