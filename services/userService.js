const User = require("@models/userModel");


const getAllUsers = async () =>{
    try{
        return await User.findAll();
    }catch(err){
        throw err;
    }
}

const getUserWithId = async(id) => {
    try{
        const user = await User.findByPk(id);
        if(!user){
            throw new Error('User not found');
        }
        return user;
    }catch(err){
        throw err;
    }
}


const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({where: {email: email}});
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports = {  getAllUsers, getUserWithId, getUserByEmail };