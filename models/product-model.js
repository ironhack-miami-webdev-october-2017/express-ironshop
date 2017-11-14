const mongoose = require("mongoose");


const Schema = mongoose.Schema;


// the schema defines the structure of documents in this collection
const productSchema = new Schema({
    // name of the product
    name: {
      type: String,
      required: [true, "Product's name is required."]
    },

    // price of the product
    price: {
      type: Number,
      required: [true, "Products need a price."],
      min: [0, "Price can't be negative."]
    },

    // URL of an image file to use in <img src="??">
    imageUrl: {
      type: String,
      required: [true, "Please provide an image URL."]
    },

    // description of the product
    description: {
      type: String,
      maxlength: [300, "Sorry, your description is too long."]
    },

    // when the product was added to the system
    dateAdded: { type: Date }
});

// the model has the methods to make database queries
const ProductModel = mongoose.model("Product", productSchema);
              //                        |
              // collection name is "products"


module.exports = ProductModel;
