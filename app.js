"use strict"
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const db = require("./models")
const port = process.env.PORT || 3000
const http = require('http').createServer(app);
const io = require('socket.io')(http)

app.enable("trust proxy")

app.get('/', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: "Testing"
  })
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

db.mongoose.connect(db.url, {
  maxPoolSize: 10
}).then((result) => {
  console.log("connect to mongodb")
})
.catch((err) => {
  console.log("error while connect mongoDB", err.message)
  process.exit()
})

app.use('/api/v1/', router)

io.on("connection", socket => {
  console.log("connection in");
  socket.on("disconnect", () => {
    console.log("connection out");
  });
});

http.listen(port, function () {
  console.log(`listening on ${port}`)
})

module.exports = app