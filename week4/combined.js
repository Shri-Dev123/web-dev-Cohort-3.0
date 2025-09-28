//file-DB-CRUD-todo

const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
app.use(express.json());
const file_name = path.join(__dirname, 'shri.json');

const readTodos = () => {
  try {
    const data = fs.readFileSync(file_name, 'utf8');
    if (data) {
      console.log(JSON.parse(data));
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error reading todos:', error);
    return [];
  }
};

app.get('/todos', (req, res) => {
  const data = readTodos();
  res.send(data);
});

const createTodo = (newToDo) => {
  try {
    const existingData = readTodos();
    const updatedData = [
      ...existingData,
      { ...newToDo, id: existingData.length + 1 },
    ];
    fs.writeFileSync(file_name, JSON.stringify(updatedData, null, 2), 'utf-8');
    console.log(newToDo, 'newTodo');
  } catch (error) {
    console.error('Error adding todo:', error);
    return error;
  }
};

app.post('/todos', (req, res) => {
  const { name, surName } = req.body;
  const data = createTodo({ name, surName });
  res.send(data);
});

const updateTodo = (id, data) => {
  try {
    const existingData = readTodos();

    const updatedData = [
      ...existingData.filter((todo) => todo.id !== Number(id)),
      { ...data, id: Number(id) },
    ];

    fs.writeFileSync(file_name, JSON.stringify(updatedData, null, 2), 'utf-8');
  } catch (error) {
    return error;
  }
};

app.patch('/todos/:id', (req, res) => {
  res.send(updateTodo(req.params.id, req.body));
});

const deleteToDo = (id) => {
  try {
    const existingData = readTodos();
    const updatedData = [
      ...existingData.filter((todo) => todo.id !== Number(id)),
    ];
    if (existingData.map((todo) => todo.id === Number(id))) {
      fs.writeFileSync(
        file_name,
        JSON.stringify(updatedData, null, 2),
        'utf-8'
      );
    }
  } catch (error) {
    return error;
  }
};

app.delete('/todos/:id', (req, res) => {
  res.send(deleteToDo(req.params.id));
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
