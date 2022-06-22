const {Strategy} = require('passport-local');
const boom = require('@hapi/boom');
const UsersService = require('../../services/usersService');

const service = new UsersService();

const LocalStrategy = new Strategy(async (email, password, done) => {
    try {
        const user = await service.findByEmail(email);
        if(!user) {
            done(boom.unauthorized(), false);
        }
        
        if(password != user._password){
            done(boom.unauthorized(), false);
        }
        delete user._password;
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

module.exports = LocalStrategy;