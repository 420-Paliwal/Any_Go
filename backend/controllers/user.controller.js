const userModel = require('../models/user.model');
const userService = require('../services/user.services')
const { validationResult } = require('express-validator')


module.exports.registerUser = async (req, res, next) => {

    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }

    const { firstname, lastname, email, password } = req.body
    const hashedpassword = await userModel.hashpassword(password)

    const user = await userService.createUser({
        firstname, lastname, email, 
        password: hashedpassword
     })

     const jwttoken = await userModel.generateAuthToken();

     res.status(201).json({token, user})

}
