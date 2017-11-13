const mongoose = require("mongoose");


const Schema = mongoose.Schema;


// the schema defines the structure of documents in this collection
const productSchema = new Schema({
    // name of the product
    name: { type: String },

    // price of the product
    price: { type: Number },

    // URL of an image file to use in <img src="??">
    imageUrl: { type: String },

    // description of the product
    description: { type: String },

    // when the product was added to the system
    dateAdded: { type: Date }
});

// the model has the methods to make database queries
const ProductModel = mongoose.model("Product", productSchema);
              //                        |
              // collection name is "products"


module.exports = ProductModel;
