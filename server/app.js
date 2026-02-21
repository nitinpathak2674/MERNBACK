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
    origin: function (origin, callback) {
      
        if (!origin || origin.includes("vercel.app") || origin.includes("localhost")) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(router);

app.listen(port, () => {
    console.log(`Server started at port no: ${port}`);
});