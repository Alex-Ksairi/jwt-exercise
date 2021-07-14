const bcrypt = require('bcrypt');
const UserModel = require('../models/UserSchema');
const authenticateHelper = require('../helpers/authenticationHelper');
// const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = await UserModel.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })  
        res.status(200).json({ message:'User has been successfully created', data: data});
    } catch (error) {
        res.status(400).json({message:'Something went wrong creating user', error:error.message});
    }
};

exports.loginUser = async (request, response) => {
    const user = await UserModel.findOne({ email: request.body.email });
    if (user === null) {
        return response.status(404).json({message:'User with the entered email could not be found'});
    }

    try {
        const checkPassword = await bcrypt.compare(request.body.password, user.password);

        if (checkPassword) {
            // Generate JWT token here
            const token = authenticateHelper.generateToken(user);
            // jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            //     if (error) {
            //         return console.log('There was an error')
            //     }
            //     else {
            //         return response.status(200).json({ message: 'The data is: ', user: user })
            //     }
            // })
            console.log('The token is:', token);
            return response.status(200).json({ token: token });
        }
        else {
            return response.status(400).json({ message: 'Passwords couldn\'t be matched' })
        }
    } catch (error) {
        response.status(400).json({message:'Something went wrong!', error: error.message});
    }
};