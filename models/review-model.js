const mongoose = require("mongoose");


const Schema = mongoose.Schema;


// the schema defines the structure of documents in this collection
const reviewSchema = new Schema({
    // text that the reviewer writes
    content: { type: String },

    // rating that the reviewer gives the product
    stars: {
      type: Number,
      required: [true, "Please rate this product."],
      min: [1, "Rating can't be less than 1."],
      max: [5, "Rating can't be greater than 5."]
    },

    // email of the reviewer
    authorEmail: {
      type: String,
      match: [/.+@.+/, "Your email is fucked up."]
    },

    // name of the reviewer
    authorName: {
      type: String,
      required: [true, "Please tell us your name."],
      minlength: [3, "Your name must be at least 3 characters long."]
    },

    // review belongs to a product
    // (this is the product's id)
    product: {
      type: Schema.Types.ObjectId,
      required: [true, "Please specify the product for this review."]
    }
});

// the model has the methods to make database queries
const ReviewModel = mongoose.model("Review", reviewSchema);
             //                        |
             // collection name is "reviews"


module.exports = ReviewModel;
