
const express = require( 'express' )
const router = express.Router()

const db = require('../models')

router.post('/', (req, res, next) => {
  const note = {
    id: req.body.id,
    title: req.body.title,
    body: req.body.body
  }

  db.Note.create(note)
    .then(dbNote => {
      return db.Saved.findOneAndUpdate(
        { _id: note.id }, 
        { $push: { note: dbNote._id } }, 
        { new: true }
      )
    })
    .then(dbSaved => {
      res.json(dbSaved)
    })
    .catch(err => {
      res.json(err)
    })
    res.send('Note created')
})

module.exports = router