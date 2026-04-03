var express = require('express');
let homeRoute = require("./home.js")
let loginRoute = require("./login.js")
let restrictedRoute = require("./restricted.js")
let logoutRoute = require("./logout.js")

let routes = [
    homeRoute,
    loginRoute,
    restrictedRoute,
    logoutRoute
]

var Router = express.Router();
Router.use(routes);

module.exports = Router;
