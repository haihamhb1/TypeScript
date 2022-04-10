const router = require("express").Router();
const User = require("../model/User")
const CryptoJS = require("crypto-js");

//DangKi
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
            ).toString(),
    });

    try{
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch{
        res.status(500).json(err);
    }

});

module.exports = router;