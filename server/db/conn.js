const mongoose = require("mongoose");

const DB = process.env.MONGO_URI;

mongoose.connect(DB)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));
