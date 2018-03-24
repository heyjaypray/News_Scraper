
const express = require( 'express' )
const router = express.Router()

const db = require('../models')

router.post('/', (req, res, next) => {
  const article = {
    title: req.body.title,
    link: req.body.link
  }

  db.Saved.create(article)
    .then(dbSaved => {
      console.log(dbSaved)
    })
    .catch(err => {
      res.json(err)
    })
    res.send('Done!')
    console.log(req)
})

router.get('/', (req, res, next) => {

  db.Saved.find({})
    .then(dbSaved => {
      res.render('home', { articles: dbSaved, saved: true })
    })
    .catch(err => {
      res.json(err)
    })
})

router.delete('/', (req, res, next) => {

  db.Saved.remove({ _id: req.body.id })
    .then(dbSaved => {
      res.json(dbSaved)
    })
    .catch(err => {
      res.json(err)
    })
})

// router.get('/', (req, res, next) => {
//   db.Saved.findOne({ _id: req.body.id })
//     .populate('note')
//     .then(dbSaved => {
//       res.send(dbSaved)
//     })
//     .catch(err => {
//       res.json(err)
//     })
// })

module.exports = router