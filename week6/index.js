const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'HelloBuddy';

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

  res.json({
    message: 'you have successfully signed up',
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

app.get('/me', (req, res) => {
  const token = req.header.token;
  const foundUser = users.find((user) => user.token === token);

  if (foundUser) {
    res.json({
      userName: foundUser.userName,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: 'The user not found',
    });
  }
});

app.listen(4545, () => {
  console.log('app is running on prot 4545');
});
