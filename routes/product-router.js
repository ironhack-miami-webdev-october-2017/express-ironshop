const express = require("express");

const ProductModel = require("../models/product-model");


const router = express.Router();


router.get("/products", (req, res, next) => {
    ProductModel
      .find()
      .limit(25)
      .sort({ dateAdded: -1 })
      .exec()
      .then((productResults) => {
          // create a local variable for the view to access the DB results
          res.locals.listOfProducts = productResults;

          // render only after the results have been retrieved
          // (the "then()" callback)
          res.render("product-views/product-list");
      })
      .catch((err) => {
          // to be determined...
      });
}); // GET /products


module.exports = router;
