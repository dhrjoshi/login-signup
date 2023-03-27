// import JWT from 'passport-jwt';
// import User from '../models/user.js';
const JWT = require('passport-jwt');
const User = require('../models/user');

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'twitter_secret'
}

const passportAuth = (passport) => {
    try {
        passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload.id);
            if(!user) {
                done(null, false);
            } else {
                done(null, user);
            }
        }));
    } catch (error) {
        console.log("Something went wrong in authorisation");
        throw error;
    }
}

module.exports = {
    passportAuth
}