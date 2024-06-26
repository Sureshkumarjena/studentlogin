const express = require('express');
const mysql = require('mysql2');
const bodyparser=require('body-parser')
const router = require('./routers/router'); // Corrected the path to the router
const port = process.env.PORT || 8085; // Corrected to use 'PORT' instead of 'port'
const app = express();

//db connectin
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  schema: 'student_db'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Close MySQL connection on app termination
process.on('SIGINT', () => {
  connection.end((err) => {
      if (err) {
          console.error('Error closing MySQL database connection: ' + err.stack);
          return;
      }
      console.log('MySQL database connection closed.');
      process.exit();
  });
});


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.static('public'))
app.set('view engine','ejs')
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
