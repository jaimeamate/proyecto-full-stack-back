const User = require("@models/userModel");
const jwt = require('jsonwebtoken');

const registerUser = async({firstName, lastName, phoneNumber, email, password }) => {
    try {
        const newUser = new User({firstName, lastName, phoneNumber, email, password});
        return await newUser.save();
    }catch(err){
        throw err;
    }
}
const createToken = (user) =>{
    const payload = {user_id: user.id, username: user.username, email: user.email, role: "admin"};
    const options = {expiresIn: '5m'};

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
}
const loginUser =
module.exports = { registerUser, createToken };