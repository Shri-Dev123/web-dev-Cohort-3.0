const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

let users = [];

app.post('/signup', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  users.push({
    userName,
    password,
  });
});

app.post('/signin', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  let foundUser = null;

  users.find((user) => {
    user.userName === userName && user.password === password
      ? (foundUser = user)
      : null;
  });

  if (foundUser) {
    const token = jwt.sign({ userName }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.json({
      message: 'the User not found',
    });
  }
});
