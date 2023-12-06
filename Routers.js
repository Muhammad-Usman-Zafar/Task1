const expressAsyncHandler = require("express-async-handler")
const express = require("express");
const Contact = require("../Schema/userSchema")

const router = express.Router();

router.route("/").get( expressAsyncHandler(async (req, res)=>{
    const user = await Contact.find();
    res.status(200).json(user);
}));
router.route("/:id").get( expressAsyncHandler(async (req, res)=>{
    const userid = await Contact.findById(req.params.id);
    if(!userid){
        res.status(404);
        throw new Error("User Not Found!")
    }
    res.status(200).json(userid);
}));

router.route("/").post( expressAsyncHandler(async (req, res)=>{
    const {name, email, role } = req.body;
    if (!name || !email || !role) {
        res.status(400);
        throw new Error("All Fields are mendatory!")
    }
    const user = await Contact.create({
        name,
        email,
        role
    });
    res.status(200).json(user);
}));

router.route("/:id").put( expressAsyncHandler(async (req, res)=>{
    const userid = await Contact.findById(req.params.id);
    if(!userid){
        res.status(404);
        throw new Error("User Not Found!")
    }
    const updatedUser = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedUser);
}));

module.exports = router;