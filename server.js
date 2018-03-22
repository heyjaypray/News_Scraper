const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express()
const PORT = process.env.PORT || 3030;

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ 
  defaultLayout: 'main',
  helpers:{
    math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    }}
 }))
app.set('view engine', 'handlebars')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger('dev'))


const index = require('./routes/index')
const scrape = require('./routes/scrape')
const article = require('./routes/articles')
const note = require('./routes/notes')

app.use('/', index)
app.use('/scrape', scrape)
app.use('/articles', article)
app.use('/notes', note)


const databaseUri = 'mongodb://localhost/newscrapedb'

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI)
} else {
	mongoose.connect(databaseUri)
}


app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
