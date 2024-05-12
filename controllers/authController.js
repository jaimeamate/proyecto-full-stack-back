const { registerUser, createToken } = require('@services/authService');
const { getUserByEmail } = require('@services/userService');
const bcrypt = require("bcrypt");

const createUser = async(req, res) =>{
    try{
        const user = await registerUser(req.body);
        const token = createToken(user);

        res.status(201).json({ jwt: token });
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const login = async (req, res) => {
    try{
        const user = await getUserByEmail(req.body.email);
        if(!user){
            res.status(404).json({error: 'User does not exist'});
        }
        if(user.password){
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if(isPasswordValid){
                const token = createToken(user);
                res.status(200).json({message: 'Login successful', jwt: token});
            }else{
                res.status(401).json({error: 'Invalid password'});
            }
        }
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = { createUser, login };