const express = require('express');
const fs = require('fs');
const path = require('path');
const host = '0.0.0.0';

const app = express();
const port = 3000;















app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Проверяем наличие файла comments.json и создаем его, если его нет
if (!fs.existsSync('comments.json')) {
  fs.writeFileSync('comments.json', '[]', 'utf8');
}

if (!fs.existsSync('users.json')) {
  fs.writeFileSync('users.json', '[]', 'utf8');
}









// Слушаем POST-запросы на /add-comment
app.post('/add-comment', (req, res) => {
  const commentText = req.body.commentText;
  const name = req.body.name;

  // Чтение текущих комментариев из файла
  let comments = [];
  try {
    comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  } catch (error) {
    console.error('Error reading comments file:', error);
    res.status(500).send({ success: false, error: 'Failed to read comments file' });
    return;
  }

  // Добавление нового комментария
  comments.push({ name, commentText });

  // Запись комментариев обратно в файл
  try {
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2), 'utf8');
    res.send({ success: true });
  } catch (error) {
    console.error('Error writing comments file:', error);
    res.status(500).send({ success: false, error: 'Failed to write comments file' });
  }
});

// Слушаем GET-запросы на /get-comments
app.get('/get-comments', (req, res) => {
  // Чтение комментариев из файла
  let comments = [];
  try {
    comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    res.send(comments);
  } catch (error) {
    console.error('Error reading comments file:', error);
    res.status(500).send({ success: false, error: 'Failed to read comments file' });
  }
});

app.listen(port, host, () => {
  console.log("Server is running");
});