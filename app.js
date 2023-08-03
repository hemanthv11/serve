const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// MySQL database connection pool
const pool = mysql.createPool({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 10,
});

// Endpoint to handle SQL query execution
app.post('/execute', (req, res) => {
  const { query } = req.body;
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return res.status(500).json({ error: 'Error executing the query' });
    }
    console.log('Query results:', results);
    return res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
