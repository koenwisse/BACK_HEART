const { Router } = require("express");

const User = require("../models/").user;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

//F1. Get all artwork

router.get("/", async (req, res) => {
  // try and catch so that we can catch the error if something wrong with api
  try {
    // declare var artworks that hold all artworks that comes from your artworks "Model"
    const artworks = await artwork.findAll();
    // send the artworks from endpoint
    res.status(200).send({ message: "ok", artworks });
    // we log the value of the property with Name Artworks from the object to console
    console.log();
  } catch (error) {
    // if database down we get this error / migration not runned
    console.log(error);
    // status code so that we get somethiung back in console / httpie terminal and know whats wrong
    return res.status(400).send({ message: "Something went wrong, sorry" });
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
  // declare var "Artwork" that holds the value bid by artwork id
  // .findByPk is find by private key. Here you define what you want to do
  // methods such as .create to create a user etc can also be used
  const space = await Space.findByPk(id, {
    // include Story array
    include: [Story],
    // define order in backend instead of in frontend
    order: [[Story, "createdAt", "DESC"]],
  });
  res.send(space);
});
module.exports = router;
