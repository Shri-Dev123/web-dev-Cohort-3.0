//inMemory-CRUD-todo

const express = require('express');
const app = express();

let toDos = [];

app.use(express.json());

app.get('/todos', (req, res) => {
  res.json(toDos);
});

app.post('/todos', (req, res) => {
  const { name, surName } = req.body;
  if (!name || !surName) {
    return res.status(400).json({ error: 'Name and surname are required.' });
  }
  const newToDo = { name, surName, id: toDos.length + 1 };
  toDos.push(newToDo);
  res.status(201).json(newToDo);
});

app.delete('/todos/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id, 10);
  const initialLength = toDos.length;
  toDos = toDos.filter((todo) => todo.id !== idToDelete);

  if (toDos.length < initialLength) {
    res.status(204).send('Todo Delete successfully');
  } else {
    res.status(404).json({ error: 'Todo not found.' });
  }
});

app.patch('/todos/:id', (req, res) => {
  const idToUpdate = parseInt(req.params.id, 10);
  const { name, surName } = req.body;

  const todoIndex = toDos.findIndex((todo) => todo.id === idToUpdate);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  if (name !== undefined) {
    toDos[todoIndex].name = name;
  }
  if (surName !== undefined) {
    toDos[todoIndex].surName = surName;
  }

  res.status(200).json(toDos[todoIndex]);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
