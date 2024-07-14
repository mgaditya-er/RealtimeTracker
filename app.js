const express = require('express');
const app = express();

const http = require('http');

const sockerio = require('socket.io');
const server = http.createServer(app);
const io = sockerio(server);

app.set('view engine', 'ejs');
app.set(express.static(__dirname + 'public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(3000);