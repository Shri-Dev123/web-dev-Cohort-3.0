const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'HelloBuddy';

let users = [];
let todos = [];

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const auth = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const foundUser = users.find((u) => u.userName === decoded.userName);
    if (!foundUser) throw new Error('User not found');

    req.currentUser = foundUser;
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

app.post('/signup', (req, res) => {
  const { userName, password } = req.body;
  users.push({ userName, password });
  res.json({ message: 'Signed up successfully' });
});

app.post('/signin', (req, res) => {
  const { userName, password } = req.body;
  const user = users.find(
    (u) => u.userName === userName && u.password === password
  );
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userName }, JWT_SECRET);
  res.json({ token });
});

app.get('/me', auth, (req, res) => {
  const user = req.currentUser;
  res.json({ userName: user.userName, password: user.password });
});

app.post('/createTodo', auth, (req, res) => {
  const { id, text } = req.body;
  todos.push({ id, text, userName: req.currentUser.userName });
  res.json({ message: 'Todo created successfully' });
});

app.get('/getTodos', auth, (req, res) => {
  const userTodos = todos.filter(
    (t) => t.userName === req.currentUser.userName
  );
  res.json({ todos: userTodos });
});

app.patch('/todos/:id', auth, (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const todo = todos.find(
    (t) => t.id == id && t.userName === req.currentUser.userName
  );
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  todo.text = text;
  res.json({ message: 'Todo updated' });
});

app.delete('/todos/:id', auth, (req, res) => {
  const { id } = req.params;
  todos = todos.filter(
    (t) => !(t.id == id && t.userName === req.currentUser.userName)
  );
  res.json({ message: 'Todo deleted' });
});

app.listen(4546, () => console.log('Server running on port 4546'));
