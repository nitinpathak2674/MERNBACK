const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

router.post("/register", async (req, res) => {
    const { fname, email, password, cpassword, gender } = req.body;

    if (!fname || !email || !password || !cpassword || !gender) {
        return res.status(422).json({ error: "Please fill all the details" });
    }

    try {
        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            return res.status(422).json({ error: "This Email already exists" });
        } else if (password !== cpassword) {
            return res.status(422).json({ error: "Password and Confirm Password do not match" });
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword, gender
            });

            const storeData = await finalUser.save();
            res.status(201).json({ status: 201, storeData });
        }
    } catch (error) {
        res.status(422).json({ error: "Registration failed", details: error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please fill all the details" });
    }

    try {
        const userValid = await userdb.findOne({ email: email });

        if (userValid) {
            const isMatch = await bcrypt.compare(password, userValid.password);

            if (!isMatch) {
                return res.status(422).json({ error: "Invalid login details" });
            } else {
                const token = await userValid.generateAuthtoken();

                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                });

                const result = { userValid, token };
                res.status(201).json({ status: 201, result });
            }
        } else {
            return res.status(401).json({ status: 401, error: "User not found" });
        }
    } catch (error) {
        res.status(401).json({ error: "Login failed server error" });
    }
});

router.get("/validuser", authenticate, async (req, res) => {
    try {
        const ValidUserOne = await userdb.findOne({ _id: req.userId });
        res.status(201).json({ status: 201, ValidUserOne });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});

router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token;
        });

        res.clearCookie("usercookie", { path: "/" });
        await req.rootUser.save();
        res.status(201).json({ status: 201 });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});

module.exports = router;