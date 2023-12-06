const expressAsyncHandler = require("express-async-handler")
const express = require("express");
const Contact = require("../Schema/userSchema")

const router = express.Router();


router.route("/").get( expressAsyncHandler(async (req, res)=>{
    const user = await Contact.find();
    res.status(200).json(user);
}));
router.route("/login/:id").get( expressAsyncHandler(async (req, res)=>{
    const userid = await Contact.findById(req.params.id);
    if(!userid){
        res.status(404);
        throw new Error("User Not Found!")
    }
    res.status(200).json(userid);
}));

router.route("/create").post( expressAsyncHandler(async (req, res)=>{
    const { name, email, role } = req.body;
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

router.route("/update/:id").put( expressAsyncHandler(async (req, res) => {
    const userid = await Contact.findById(req.params.id);
    if (!userid) {
        res.status(404);
        throw new Error("User Not Found!");
    }

    if (req.body.role && req.body.role.toLowerCase() === "admin" && userid.role === "admin") {
        res.status(403)
        throw new Error("You can't update user")
    }
    if (req.body.role && req.body.role.toLowerCase() === "admin" && userid.role !== "admin") {
        userid.role = "admin"
        await userid.save();
    }

    const updatedUser = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedUser);
    

    
}));

router.route("/delete/:id").delete( expressAsyncHandler(async (req, res) => {
    const user = await Contact.findByIdAndDelete(req.params.id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.status(200).json({ message: "User deleted successfully" });
}));


module.exports = router;