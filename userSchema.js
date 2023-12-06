const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Add the name."]
    },
    email: {
        type: String,
        required: [true, "Please Add the email."]
    },
    role:{
        type: String,
        required: [true, "Please Add the role."]
    }
});

module.exports = mongoose.model("Users", userSchema);