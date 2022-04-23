const Router = require('express').Router();

const usersRouter = require('./users');

Router.use('/users', usersRouter);

module.exports = Router;
