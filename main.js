const http = require("http");
const fs = require('fs').promises;
const host = 'localhost';
const port = 8000;

const express= require('express');
const app = express();
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/main.html');
})
app.listen(8000, () => console.log('The server running on Port '+port));