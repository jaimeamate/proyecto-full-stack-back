const { User } = require("@models/index");


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


const getUserWithEmail = async (email) => {
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
const editUserPut = async(userId, updatedFields) =>{
    try{
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        Object.keys(updatedFields).forEach(key => {
            if (updatedFields[key] !== undefined){
                user[key] = updatedFields[key];
            }else{
                throw new Error('All fields are required');
            }
        })
        return await user.save();
    }catch(err){
        throw err;
    }
}

const editUserPatch = async (userId, updatedFields) => {
    try{
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        Object.keys(updatedFields).forEach(key => {
            user[key] = updatedFields[key];
        })
        return await user.save();
    }catch(err){
        throw err;
    }
}
module.exports = {  getAllUsers, getUserWithId, getUserWithEmail, editUserPut, editUserPatch };