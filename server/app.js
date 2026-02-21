require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 8009;

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: ["http://localhost:3000", "https://mernfront-two.vercel.app"],
    credentials: true
}));

app.use(router);

app.listen(port, () => {
    console.log(`Server started at port no: ${port}`);
});