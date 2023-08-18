const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3010;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

app.use(express.json());
const mysql = require('mysql');

//connection to db
const connection = mysql.createConnection({
  host: 'colman-db.cqhshsauir0y.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '12345678',
  database: 'colman',
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database');
  }
});


app.get('/server/leaderboard', (req, res) => {
  const sql = 'SELECT * FROM HighScores ORDER BY Score DESC';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching leaderboard data:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch leaderboard data' });
    } else {
      res.json(results);
    }
  });
});

app.get('/server/leaderboard', (req, res) => {
  res.json(leaderboardData);
  console.log(leaderboardData);
});

app.post('/server/add-player', (req, res) => {
  const { name, score } = req.body;

  const sql = 'INSERT INTO HighScores (Name, Score) VALUES (?, ?)';

  connection.query(sql, [name, score], (error, results) => {
    if (error) {
      console.error('Error adding player:', error);
      res.json({ success: false, message: 'Failed to add player' });
    } else {
      res.json({ success: true, message: 'Player added successfully' });
    }
  });
});


app.delete('/server/delete-player/:name', (req, res) => {
  const playerName = req.params.name;

  const sql = 'DELETE FROM HighScores WHERE Name = ?';

  connection.query(sql, [playerName], (error, results) => {
    if (error) {
      console.error('Error deleting player:', error);
      res.json({ success: false, message: 'Failed to delete player' });
    } else {
      res.json({ success: true, message: 'Player deleted successfully' });
    }
  });
});


app.delete('/server/delete-player/:id', (req, res) => {
  const playerId = parseInt(req.params.id);
  leaderboardData = leaderboardData.filter(player => player.id !== playerId);
  res.json({ success: true, message: 'Player deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});