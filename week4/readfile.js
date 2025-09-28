// only-file-based-todo

const fs = require('fs');
const path = require('path');

const file_name = path.join(__dirname, 'shri.json');

export const readTodos = () => {
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

const createTodo = (newToDo) => {
  try {
    const existingData = readTodos();
    const updatedData = [
      ...existingData,
      { ...newToDo, id: existingData.length + 1 },
    ];
    fs.writeFileSync(file_name, JSON.stringify(updatedData, null, 2), 'utf-8');
    console.log(updatedData, 'updated data');
    console.log(existingData, 'existingData');
  } catch (error) {
    console.error('Error adding todo:', error);
    return error;
  }
};

const updateTodo = (id, data) => {
  try {
    const existingData = readTodos();

    const updatedData = [
      ...existingData.filter((todo) => todo.id !== id),
      { ...data, id },
    ];

    fs.writeFileSync(file_name, JSON.stringify(updatedData, null, 2), 'utf-8');
  } catch (error) {
    return error;
  }
};

const deleteToDo = (id) => {
  try {
    const existingData = readTodos();
    const updatedData = [...existingData.filter((todo) => todo.id !== id)];
    if (existingData.map((todo) => todo.id === id)) {
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

// createTodo({ name: 'shrikant', surName: 'kallshetty' });
// updateTodo(1, { name: 'hell', surName: 'kallshetty' });
// deleteToDo(1);
// readTodos();
