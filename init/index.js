const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/Voyageur";

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(Mongo_URL);
}

const initDB = async () => {
   await Listing.deleteMany({});
   //initdata.data = initdata.data.map((obj) => ({...obj,owner : "67264d7e5e1180aec950cd82"}));
   await Listing.insertMany(initdata.data);
   console.log("data was initialized")
}

initDB();