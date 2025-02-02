
const mongoose = require("mongoose");

const artSchema = new mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

const ArtModel = mongoose.model("Art", artSchema);

module.exports = ArtModel;

