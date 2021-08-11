const express = require('express');
const bodyPareser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const ejs = require('ejs')
const app = express();
const path = require('path')
const fs = require("fs");
const session = require('express-session')
const morgan = require('morgan');
const liveSteamLogs = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: 'a'})
app.set("view engine", "ejs")
app.set("views", "views")
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyPareser.json())
app.use(bodyPareser.urlencoded({extended: true}))
app.use(cors());
app.use(compress());
app.use(helmet());
app.use(cookieParser())
app.use(morgan("combined", {stream: liveSteamLogs}));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.get('/*', function(req, res, next){ 
  res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'");
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next(); 
});

app.use((req, res, next) => {
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
});

const userRoutes = require('./routes/user.routes')
const homeRoute = require('./routes/home.routes')
const adminRoute = require('./routes/admin.routes')
const authRoute = require('./routes/auth.routes')

app.use('/', userRoutes)
app.use('/', homeRoute)
app.use('/', adminRoute)
app.use('/', authRoute)

app.use( (req, res, next) => {
  res.status(404).render("routes/error",{path: "/404"});
  next();
})

module.exports = app;
