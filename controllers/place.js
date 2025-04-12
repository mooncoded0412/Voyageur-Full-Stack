const Listing = require("../models/listing.js");
const mongoose = require("mongoose");


module.exports.index = async (req, res) => {
    const top10 = await Listing.find({ rank: { $gte: 1, $lte: 10 } });
    const mountain = await Listing.findOne({ Terrain: "Mountain" });
    const beach = await Listing.findOne({ Terrain: "Beach" });
    const snow = await Listing.findOne({ Terrain: "Snow" });
    const desert = await Listing.findOne({ Terrain: "Desert" });
    const mystery = await Listing.findOne({ Terrain: "Mysterious" });
    const horror = await Listing.findOne({ Terrain: "Horror" });
    
    res.render("places/index.ejs", { top10, mountain, beach, snow, desert, mystery, horror });
    console.log("Successful rendering");
}

module.exports.relatedTerrains = async (req, res) => {
    let { id } = req.params;
    const place = await Listing.findById(id);

    if (!place) {
        return res.status(404).send("Place not found");
    }

    // Find all related places by terrain
    //const relatedPlaces = await Listing.find({ Terrain: place.Terrain });
    const relatedPlaces = await Listing.find({ Terrain: { $in: place.Terrain } });


    // You might want to include additional categories if you have them:
    // Example: Finding all haunted places in addition to the matched terrain

    res.render("places/showrelated.ejs", {relatedPlaces });
}

module.exports.carousel = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID");
    }

    const place = await Listing.findById(id)
    .populate({
            path :"reviews",
            populate : {
            path : "author",
            },
        });
    if (!place) {
       req.flash("error","Location Not Found");
       res.redirect("/places");
        // return res.status(404).send("Place not found");
    }
    res.render("places/show.ejs", { place });
}

module.exports.showRoute = async (req,res,next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID");
    }

    const place = await Listing.findById(id);
    if (!place) {
        return res.status(404).send("Place not found");
    }
    res.render("places/show.ejs", { place });
}