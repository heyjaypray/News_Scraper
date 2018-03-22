
const express = require( 'express' )
const router = express.Router()


const db = require('../models')

router.get('/', (req, res, next) => {
  db.Article.find({})
    .then(dbArticle => {
      res.render('home', { articles: dbArticle })
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router