const UserService = require('../services/user-service');

const userService = new UserService();

const signUp = async (req, res) => {
    try {
        const response = await userService.signUp({
            email: req.body.email,
            password: req.body.password,
            userName: req.body.userName,
            phoneNumber: req.body.phoneNumber,
            city: req.body.city
        })
        return res.status(201).json({
            data: response,
            success: true,
            message: 'Successfully SignedUp',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to signUp',
            err: error
        });
    }
}

const login = async (req, res) => {
    try {
        const token = await userService.signIn(req.body);
        return res.status(200).json({
            data: token,
            success: true,
            message: 'Successfully logged in',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to login',
            err: error
        });
    }
}

module.exports = {
    signUp,
    login
}