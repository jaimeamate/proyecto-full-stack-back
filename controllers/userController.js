const { getAllUsers, getUserWithId } = require('@services/userService');
const httpStatus = require('@configs/httpStatusCode.json');


const getUsers = async(req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
}

const getUserById = async (req, res) => {
    try{
        const user = await getUserWithId(req.params.id);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({error: httpStatus['404']});
        }
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = { getUsers, getUserById };
