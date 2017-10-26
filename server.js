/*
- We require the module config to access the configuration file named as the NODE_ENV content to get the mongo db URI parameter for the db connection. This helps us to keep the "real" database clean by testing on another database hidden to our app future users.
- The enviroment variable NODE_ENV is test against test to disable morgan log in the command line or it would interfere with the test output.
- The last line of code exports the server for testing purposes.
- Notice the variables definition using let which makes the variable enclosed to the nearest enclosing block or global if outside any block.
*/

let express = require("express")
let mongoose = require("mongoose")
let morgan = require("morgan")
let bodyParser = require("body-parser")
let PORT = process.env.PORT || 8080
let book = require("./app/routes/book")
let config = require("config")

let app = express()

// DB options
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}

//DB connection
mongoose.connect(config.DBHost, options)
let db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))

// Don't show the log when it is test
if (config.util.getEnv("NODE_ENV") !== "test") {
  // Use morgan to log in the command line
  app.use(morgan("combined"))
}

// Parse app/json
app.use(bodyParser.json())
app.use(bodyParser.json({ type: "application/json" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())

// Routes
app.get("/", (req, res) => res.json({ message: "Home route here" }))
app
  .route("/book")
  .get(book.getBooks)
  .post(book.postBook)
app
  .route("/book/:id")
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook)

app.listen("Server started on port", PORT)

// For testing
module.exports = app
