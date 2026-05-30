const express = require('express');
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

// REGISTER (Task 6)
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Unable to register user." });
  }

  if (isValid(username)) {
    return res.status(404).json({ message: "User already exists!" });
  }

  users.push({ username, password });

  return res.status(200).json({
    message: "User successfully registered. Now you can login"
  });
});


// Task 10 - Promise .then()/.catch()
public_users.get('/', function (req, res) {
    new Promise((resolve, reject) => {
      if (books) resolve(books);
      else reject(new Error("No books found"));
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: err.message }));
  });
  
  // Tasks 11, 12, 13 - async/await with Axios
  public_users.get('/isbn/:isbn', async function (req, res) {
    try {
      const response = await axios.get(baseURL + "/isbn/" + req.params.isbn);
      return res.status(200).json(response.data);
    } catch (error) { ... }
  });


// Task 5 - Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({ message: "Book not found" });
});

module.exports.general = public_users;