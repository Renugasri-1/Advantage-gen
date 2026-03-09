require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const generateRoute = require("./routes/generate");

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI )
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/outputs", express.static("outputs"));
app.use("/api", generateRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});