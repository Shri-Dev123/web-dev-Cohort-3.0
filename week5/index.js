const express = require('express');
const app = express();

app.use(express.json());

app.get('/addition', (req, res) => {
  const { num1, num2 } = req.query;

  console.log(req.query, 'query params');

  const result = Number(num1) + Number(num2);
  res.json({ result: `your provided numbers addition is ${result}` });
});

app.get('/substraction', (req, res) => {
  const { num1, num2 } = req.query;

  console.log(req.query, 'query params');

  const result = Number(num1) - Number(num2);
  res.json({ result: `your provided numbers substraction is ${result}` });
});

app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;

  console.log(req.query, 'query params');

  const result = Number(num1) * Number(num2);
  res.json({ result: `your provided numbers miliplication is ${result}` });
});

app.get('/division', (req, res) => {
  const { num1, num2 } = req.query;

  console.log(req.query, 'query params');

  const result = Number(num1) / Number(num2);
  res.json({ result: `your provided numbers division is ${result}` });
});

app.listen(3000, () => {
  console.log('App is running on port 3000');
});
