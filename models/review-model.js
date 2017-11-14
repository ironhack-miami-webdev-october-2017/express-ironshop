const mongoose = require("mongoose");


const Schema = mongoose.Schema;


// the schema defines the structure of documents in this collection
const reviewSchema = new Schema({
    // text that the reviewer writes
    content: { type: String },

    // rating that the reviewer gives the product
    stars: { type: Number },

    // email of the reviewer
    authorEmail: { type: String },

    // name of the reviewer
    authorName: { type: String },

    // review belongs to a product
    // (this is the product's id)
    product: { type: Schema.Types.ObjectId }
});

// the model has the methods to make database queries
const ReviewModel = mongoose.model("Review", reviewSchema);
             //                        |
             // collection name is "reviews"


module.exports = ReviewModel;
