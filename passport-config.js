const UserModel = require('./models/UserSchema');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function initialize(passport) {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, 
        function (jwtPayload, done) {
            return UserModel.findById(jwtPayload.sub)
                .then(user => { return done(null, user) })
                .catch(error => { return done(error) })
        }
    ))
};

module.exports = initialize;