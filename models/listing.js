const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title :{
     type : String,
     required : true,
    },
    description : { 
        type:String,
    },
    image : {
    type : String,
    },
    Terrain : {
        type : Array,
        required : true,
    },
    location : {
        type : String,
    },
    rank : {
        type : Number,
        required : false
    },
    country : {
        type : String,
    },
    reviews : [
    {
        type : Schema.Types.ObjectId,
        ref : "Review",
    }],
});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;