const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const users = require("../models/users");

//------------------------adddition-------------------	


//---------------------------------------addition------------------------	
module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        users.getUserById(jwt_payload.id, (err, User) => {
            if (err) {
                return done(err, false);
            }
            if (User) {
                return done(null, User);
            } else {
                return done(null, false);
            }
        });
    }))


    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        users.findById(id).then((user) => {
            done(null, user);

        })
    })
}
