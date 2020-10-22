require("dotenv").config();

var sslRedirect = require("heroku-ssl-redirect");
//auth et SID de heroku si déployer, sinon local .env
var twilioAuthToken =
    process.env.HEROKU_AUTH_TOKEN || process.env.LOCAL_AUTH_TOKEN;
var twilioAccountSID =
    process.env.HEROKU_TWILIO_SID || process.env.LOCAL_TWILIO_SID;
var twilio = require("twilio")(twilioAccountSID, twilioAuthToken);
var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var path = require("path");
var public = path.join(__dirname, "public");
const url = require("url");


//active ssl redirect
app.use(sslRedirect());


//supprime les slashes dans url
app.use(function(req, res, next) {
    if (req.path.substr(-1) === "/" && req.path.length > 1) {
        let query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});