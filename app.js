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

// CORS configuration (Deployment ke liye zaroori)
app.use(cors({
    origin: ["http://localhost:3000", "https://your-vercel-frontend-link.vercel.app"], // Vercel wala link baad mein yahan dalna hoga
    credentials: true
}));

app.use(router);

app.listen(port, () => {
    console.log(`Server started at port no: ${port}`);
});