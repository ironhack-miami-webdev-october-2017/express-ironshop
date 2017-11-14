const express = require("express");

const ProductModel = require("../models/product-model");
const ReviewModel = require("../models/review-model");


const router = express.Router();


// STEP #1: show the create a new review form
router.get("/products/:prodId/reviews/new", (req, res, next) => {
    // retrieve the product document to display its details next to the form
    ProductModel.findById(req.params.prodId)
      .then((productFromDb) => {
          res.locals.productDetails = productFromDb;

          res.render("review-views/review-form");
      })
      .catch((err) => {
          next(err);
      });
}); // GET /products/:prodId/reviews/new

// STEP #2: process the new review submission
router.post("/products/:prodId/reviews", (req, res, next) => {
    // retrieve the product document to make sure the ID is good
    ProductModel.findById(req.params.prodId)
      .then((productFromDb) => {
          // now that we know the product ID is good we can create the review
          const theReview = new ReviewModel({
              content:     req.body.reviewContent,
              stars:       req.body.reviewStars,
              authorEmail: req.body.reviewAuthorEmail,
              authorName:  req.body.reviewAuthorName,
              product:     req.params.prodId
          });    //              |
                 // product ID comes from the URL params

          // and save the new review to the database
          // (return the promise of the next database operation)
          return theReview.save();
      })
      .then(() => {
          // STEP #3: redirect after a SUCCESSFUL save
          // redirect to the product details page
          res.redirect(`/products/${req.params.prodId}`);
            // you CAN'T redirect to an EJS file
            // you can ONLY redirect to a URL
      })
      .catch((err) => {
          next(err);
      });
}); // POST /products/:prodId/reviews


module.exports = router;
