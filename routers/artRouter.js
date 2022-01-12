const { Router } = require("express");
const sequelize = require("sequelize");
const auth = require("../auth/middleware");
const { artwork, bid } = require("../models");
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

//F1 and F2 Get all artwork and bids

router.get("/", async (req, res, next) => {
  // try and catch so that we can catch the error if something wrong with api
  try {
    // declare var artworks that hold all artworks that comes from your artworks "Model" and include from model bids all bids
    const artworks = await artwork.findAll({
      include: [
        {
          model: bid,
        },
      ],
    });
    // send the artworks (array with objects) from endpoint
    res.status(200).send({ message: "ok", artworks });
    // we log the value of the property with Name Artworks from the object to console
  } catch (e) {
    next(e);
  }
});
//F2. get artwork details by artworkId
// (examples httpie requests http GET :4000/artwork/1)
// F2.1. Set up endpoint for this
router.get("/:id", async (req, res, next) => {
  // declare var id (by destructuring=unpacking values from object) that holds the value req.params
  // params is the :id
  const { id } = req.params;
  // clg id to see if you get the right value
  console.log(id);
  // declare var "bid" that holds the value bid by artwork id
  // .findByPk is find by private key. Here you define what you want to do
  const artwork = await artwork.findByPk(id, {
    // include bid array
    include: [bid],
    // define order in backend instead of in frontend
    // order: [[Story, "createdAt", "DESC"]],
  });
  res.send(space);
});

//F4.

//F3. Patch endpoint

router.patch("/:id/hearts", async (req, res, next) => {
  try {
    const { id } = req.params;
    const newArtwork = await artwork.findByPk(id, {
      include: [bid],
    });
    newArtwork.hearts += 1;
    await newArtwork.save();
    res.send({ artwork: newArtwork });
  } catch (e) {
    next(e);
  }
});

// ENDPOINT FOR F4 ALSO HERE
// Add auth: router.post("/:id/bids", async (req, res) => {
// We need to create a new entry in our DB --> post
router.post("/:id/bids", async (req, res, next) => {
  try {
    // data is coming from the body as we get it from the frontend form
    // we read the artworkId from the URL (:id parameter) and store it as an integer in the artworkId variable:
    const artworkId = req.params.id;
    // what are we going to create in DB:
    const { email, amount } = req.body;
    console.log("params", req.params);
    console.log("body", req.body);

    // sequelize loads an array "bits" for us automatically, because `artwork` and `bid` models have a one-to-many relationship
    const updatedArtwork = await artwork.findByPk(artworkId, {
      include: [bid],
    });
    console.log({ artworkId, updatedArtwork });
    // if there are already any bids (updatedArtwork.bids.length > 0), then we take the maximum amount of the existing bids (Math.max(...updatedArtwork.bids.map(bid => bid.amount)))
    // otherwise, we read the `minimumBid` from the artwork itself.
    const minimumBid =
      updatedArtwork.bids.length > 0
        ? Math.max(...updatedArtwork.bids.map((bid) => bid.amount))
        : updatedArtwork.minimumBid;

    if (amount > minimumBid) {
      // We need to validate first but under the right circumstances create a new amount (so a new bid)
      const newBid = await bid.create({ email, amount, artworkId, minimumBid });
      updatedArtwork.bids.push(newBid);
      // I need to send a response
      // write if statements to decide when to update
      res.send({
        artwork: updatedArtwork,
        success: true,
        error: null,
      });
    } else {
      res.status(400).send({
        artwork: updatedArtwork, // `updatedArtwork` is actually not updated in this case!
        success: false,
        error: "the bid is not high enough",
      });
    }
  } catch (e) {
    next(e);
  }
});

// router.post("/:id/bids", async (req, res, next) => {
//   const { id } = req.params;
//   const newArtwork = await artwork.findByPk(id, {
//     include: [bid],
//   });
//   console.log(newArtwork);
//   await artwork.create({});
//   res.send({ newbid: newBid });
// });

module.exports = router;

// const a = 3;
// const b = 4;
// if (a > 10) {
//   console.log("vet hoog")
// } else if(a < b) {
//   console.log("a kleiner dan b");
// } else {
//   console.log("a >= b")
// }

// 1. Get bids for artwork from database.
// 2. if the array of bids is empty, then look at 'minimumBid' property from artwork (taken frmo database).
// 3. if array not empty, then find the highest bid amount from the array of bids;
// 4. compare the amount with what the user provided.
