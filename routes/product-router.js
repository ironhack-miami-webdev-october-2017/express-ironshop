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
          // render the error page with our error
          next(err);
      });
}); // GET /products


// STEP #1: show the new product form
router.get("/products/new", (req, res, next) => {
    res.render("product-views/product-form");
}); // GET /products/new

// STEP #2: process the new product submission
router.post("/products", (req, res, next) => {
    const theProduct = new ProductModel({
        name:        req.body.productName,
        price:       req.body.productPrice,
        imageUrl:    req.body.productImage,
        description: req.body.productDescription,
        dateAdded:   new Date()  // |
    }); // |                     // |
        // fields from         names of the
        // model's schema      input tags

    theProduct.save()
      .then(() => {
          // STEP #3: redirect after a SUCCESSFUL save
          // redirect to the list of products page
          res.redirect("/products");
            // you CAN'T redirect to an EJS file
            // you can ONLY redirect to a URL
      })
      .catch((err) => {
          // render the error page with our error
          next(err);
      });
}); // POST /products


router.get("/products/details", (req, res, next) => {
    //      /products/details?prodId=9999
    //                           |
    //              req.query.prodId
    // ProductModel.findOne({ _id: req.query.prodId })
    ProductModel.findById(req.query.prodId)
      .then((productFromDb) => {
          // create a local variable for the view to access the DB result
          res.locals.productDetails = productFromDb;

          res.render("product-views/product-details");
      })
      .catch((err) => {
          // render the error page with our error
          next(err);
      });
}); // GET /products/details


// Routes with URL parameters need to be at the BOTTOM
router.get("/products/:prodId", (req, res, next) => {
    //      /products/ 9999
    //                   |
    //      req.params.prodId
    // ProductModel.findOne({ _id: req.params.prodId })
    ProductModel.findById(req.params.prodId)
      .then((productFromDb) => {
          // create a local variable for the view to access the DB result
          res.locals.productDetails = productFromDb;

          res.render("product-views/product-details");
      })
      .catch((err) => {
          // render the error page with our error
          next(err);
      });
}); // GET /products/:prodId


// STEP #1: show edit form
router.get("/products/:prodId/edit", (req, res, next) => {
    // retrieve the document from the database
    ProductModel.findById(req.params.prodId)
      .then((productFromDb) => {
          // create a local variable for the view to access the DB result
          // (this is so we can pre-fill the form)
          res.locals.productDetails = productFromDb;

          res.render("product-views/product-edit");
      })
      .catch((err) => {
          // render the error page with our error
          next(err);
      });
});

// STEP #2: receive edit submission
router.post("/products/:prodId", (req, res, next) => {
    // retrieve the document from the database
    ProductModel.findById(req.params.prodId)
      .then((productFromDb) => {
          // update the document
          productFromDb.set({
              name:        req.body.productName,
              price:       req.body.productPrice,
              imageUrl:    req.body.productImage,
              description: req.body.productDescription
          }); // |                        |
              // fields from         names of the
              // model's schema      input tags

          // and then save the updates
          // (return the promise of the next database operation)
          return productFromDb.save();
      })
      .then(() => {
          // STEP #3: redirect after a SUCCESSFUL save
          // redirect to the product details page
          res.redirect(`/products/${req.params.prodId}`);
            // you CAN'T redirect to an EJS file
            // you can ONLY redirect to a URL
      })
      .catch((err) => {
          // render the error page with our error
          next(err);
      });
});


module.exports = router;
