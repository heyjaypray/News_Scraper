
const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const request = require("request");


const db = require("../models");

router.get("/", (req, res, next) => {
  const url = "https://www.reddit.com";

  request(url, (err, response, html) => {
    if (err) throw err;

    const $ = cheerio.load(html);

    $("p.title").each(function(i, element) {
      const article = {
        title: $(element).children("a").text(),
        link: $(element).children("a").attr("href")
      };

      console.log(article);

      db.Article.create(article)
        .then(dbArticle => {
          console.log(dbArticle);
        })
        .catch(err => {
          return res.json(err);
        });
    });
    res.send("Scraping was completed!");
  });
});

module.exports = router;
