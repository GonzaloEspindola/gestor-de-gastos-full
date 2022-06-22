const passport = require('passport');

const usersRouter = require('./users')
const tablesRouter = require('./tables');
const authRouter = require('./auth');


function routerApi(app) {
    app.use('/users', usersRouter);
    app.use('/tables', passport.authenticate('jwt', {session: false}) , tablesRouter);
    app.use('/auth', authRouter);
}

module.exports = routerApi;