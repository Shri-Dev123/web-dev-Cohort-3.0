const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'HelloBuddy';

const app = express();
app.use(express.json());

let users = [];
let todos = [];

const auth = (req, res, next) => {
  const token = req.headers.token;
  const docodedData = jwt.verify(token, JWT_SECRET);
  const foundUser = users.find(
    (user) => user.userName === docodedData.userName
  );

  if (typeof foundUser === 'object') {
    req.currentUser = foundUser;
    next();
  } else {
    res.json({
      message: 'user not signedIn',
    });
  }
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
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

  foundUser = users.find(
    (user) => user.userName === userName && user.password === password
  );

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

app.get('/me', auth, (req, res) => {
  const foundUser = req.currentUser;
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

app.post('/createTodo', (req, res) => {
  const todo = req.body;
  if (todo) {
    todos.push(todo);
    res.json({
      todo,
      message: 'todo created sucessfully',
    });
  }
});

app.get('/getTodos', (req, res) => {
  if (todos.length > 0) {
    res.json({
      todos,
    });
  } else {
    res.json({
      message: "todo's not found",
    });
  }
});

app.listen(4546, () => {
  console.log('app is running on prot 4546');
});
