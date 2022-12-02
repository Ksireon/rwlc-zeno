const express = require('express')
const app = express()
let PORT = process.env.PORT || 3000
const http = require('http')
const server = http.createServer(app)
const {
    Server
} = require("socket.io");
const io = new Server(server);
const token = require('./token')


const TelegramBot = require('node-telegram-bot-api');
const { log } = require('console');
const bot = new TelegramBot(token, {
    polling: true
});

io.on('connection', (socket) => {
    socket.on('send_msg', obj => {
        io.emit('new_msg', {name: obj.name, body: obj.body})
    })
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(express.static('assets'))
server.listen(PORT, () => {
    console.log(`Server start work on port ${PORT}`);
})