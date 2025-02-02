const express = require("express");
require("./connection");
const ArtModel = require("./model");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(express.json());
app.use(cors());

// POST data
app.post("/add", async (req, res) => {
  try {
    const newArt = new ArtModel(req.body);
    await newArt.save();
    console.log("Data added successfully");
    res.send({ message: "Data added successfully!" });
  } catch (error) {
    console.error("Error on adding data:", error);
    res.status(500).send({ message: "Error on adding data", error });
  }
});

// GET data 
app.get("/get", async (req, res) => {
  try {
    const data = await ArtModel.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ message: "Error fetching data", error });
  }
});

// DELETE data
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedItem = await ArtModel.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).send({ message: "Item not found" });
    }
    console.log("Data deleted successfully");
    res.send({ message: "Data deleted successfully!" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send({ message: "Error deleting data", error });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3000");
});
