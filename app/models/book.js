let mongoose = require("mongoose")
let Schema = mongoose.Schema

let BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    pages: { type: Number, required: true, min: 1 },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
)

// Set the createdAt field to the current date
BookSchema.pre("save", next => {
  if (!this.createdAt) {
    this.createdAt = new Date()
  }
  next()
})

module.exports = mongoose.model("book", BookSchema)
