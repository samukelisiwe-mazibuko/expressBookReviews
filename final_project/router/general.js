const express = require('express');
const axios = require("axios");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

const baseURL = "http://localhost:5000";

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


// TASK 10 - Get all books (Axios + async/await)
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get(baseURL + "/");
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});


// TASK 11 - Get by ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const response = await axios.get(baseURL + "/isbn/" + req.params.isbn);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book by ISBN" });
  }
});


// TASK 12 - Get by Author
public_users.get('/author/:author', async function (req, res) {
  try {
    const response = await axios.get(baseURL + "/author/" + req.params.author);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author" });
  }
});


// TASK 13 - Get by Title
public_users.get('/title/:title', async function (req, res) {
  try {
    const response = await axios.get(baseURL + "/title/" + req.params.title);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title" });
  }
});


// TASK 5 (KEEP - review)
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;