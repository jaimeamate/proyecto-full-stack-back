const { registerUser } = require('@services/authService');

const createUser = async(req, res) =>{
    try{
        const result = await registerUser(req.body);
        res.status(202).status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = { createUser };