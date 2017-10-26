/*
- The routes are no more than standard routes, GET, POST, DELETE, PUT to perform CRUD operations on our data.
- In the function updatedBook() we use Object.assign, a new function introduced in ES6 which, in this case, overrides the common properties of book with req.body while leaving untouched the others.
- At the end we export the object using a faster syntax which pairs key and value to avoid useless repetitions.
*/

let mongoose = require("mongoose")
let Book = require("../models/book")

exports.getBooks = (req, res) => {
  // Query the DB. Send all books if no errors
  Book.find({}, (err, books) => {
    if (err) res.send(err)
    else res.json(books)
  })
}

exports.postBook = (req, res) => {
  var newBook = new Book(req.body)
  newBook.save((err, book) => {
    if (err) res.send(err)
    else res.json({ msg: "Book successfully added!", book })
  })
}

exports.getBook = (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) res.send(err)
    else res.json(book)
  })
}

exports.deleteBook = (req, res) => {
  Book.remove({ _id: req.params.id }, (err, result) => {
    if (err) res.send(err)
    else res.json({ msg: "Book removed.", result })
  })
}

exports.updateBook = (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) res.send(err)
    else
      Object.assign(book, req.body).save((err, book) => {
        if (err) res.send(err)
        else res.json({ msg: "Book updated!", book })
      })
  })
}
