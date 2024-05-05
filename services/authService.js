const User = require("@models/userModel");

const registerUser = async({firstName, lastName, phoneNumber, email, password }) => {
    try {
        const newUser = new User({firstName, lastName, phoneNumber, email, password});
        return await newUser.save();
    }catch(err){
        throw err;
    }
}

module.exports = { registerUser };