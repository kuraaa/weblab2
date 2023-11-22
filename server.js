const express = require('express');
const fs = require('fs');
const path = require('path');
const host = '0.0.0.0';
const bodyParser = require('body-parser');

const DATA_FILE_PATH = path.join(__dirname, 'data.json');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


if (!fs.existsSync('comments.json')) {
  fs.writeFileSync('comments.json', '[]', 'utf8');
}

if (!fs.existsSync('data.json')) {
  fs.writeFileSync('data.json', '[]', 'utf8');
}


app.post('/add-comment', (req, res) => {
  const commentText = req.body.commentText;
  const name = req.body.name;


  let comments = [];
  try {
    comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  } catch (error) {
    console.error('Error reading comments file:', error);
    res.status(500).send({ success: false, error: 'Failed to read comments file' });
    return;
  }

  comments.push({ name, commentText });
  try {
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2), 'utf8');
    res.send({ success: true });
  } catch (error) {
    console.error('Error writing comments file:', error);
    res.status(500).send({ success: false, error: 'Failed to write comments file' });
  }
});

app.get('/get-comments', (req, res) => {
  let comments = [];
  try {
    comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    res.send(comments);
  } catch (error) {
    console.error('Error reading comments file:', error);
    res.status(500).send({ success: false, error: 'Failed to read comments file' });
  }
});

function readDataFile() {
  try {
      const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
      return JSON.parse(data) || [];
  } catch (error) {
      console.error(error);
      return [];
  }
}


function writeDataFile(data) {
  try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
      console.error(error);
  }
}


app.post('/signup', (req, res) => {
  const { username, password, key } = req.body;

  try {
      const users = readDataFile();
      const existingUser = users.find(user => user.username === username);
      if (existingUser) {
          return res.status(400).json({ message: 'Username already exists. Please choose a different one.' });
      }

      users.push({ username, password, key });
      writeDataFile(users);

      return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  try {
    const users = readDataFile();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      const key = user.key;
      return res.status(200).json({ message: 'Login successful!', key});
    } else {
      return res.status(401).json({ message: 'Incorrect username or password. Please try again.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.delete('/delete-comment/:commentId', (req, res) => {
  const commentId = req.params.commentId;

  try {
    let comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

    // Удаление комментария по ID
    comments = comments.filter(comment => comment.id !== commentId);

    // Запись комментариев обратно в файл
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2), 'utf8');

    res.send({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send({ success: false, error: 'Failed to delete comment' });
  }
});



app.listen(port, host, () => {
  console.log("Server is running");
});