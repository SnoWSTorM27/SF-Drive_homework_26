const express = require("express");
const bodyParser = require('body-parser');

const mongoose = require("mongoose");

const router = express.Router();

const userSchema = new mongoose.Schema({
    name: String
});

const User = mongoose.model("User", userSchema);

router.get("/", async (req, res)=> {
    const data = await User.find();
    res.send(data);  
})

// router.get("/:id", async (req, res) => {
//     res.statusCode = 418;
//     res.setHeader("X-File", "Scally");
//     const id = req.params.id;
//     const sorting = req.query.sorting;
//     res.send(`I have received data on user #${id} with ${sorting} sorting`);
//   });
const jsonParser = bodyParser.json();

router.post("/", jsonParser, async  (req, res)=> {
    const userData = req.body;
    const newUser = new User(userData);
    console.log(newUser, userData, req.query)
    await newUser.save();
    res.send("Your user has been saved!");
});


module.exports = {
    usersRouter : router
};

