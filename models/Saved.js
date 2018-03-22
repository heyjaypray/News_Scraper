
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SavedSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  link: {
    type: String,
    unique: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }
})

const Saved = mongoose.model('Saved', SavedSchema)

module.exports = Saved