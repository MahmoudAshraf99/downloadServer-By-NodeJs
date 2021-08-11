const express = require("express")
const router = express.Router();
const usrCtrl = require('../controllers/user.controller')
const csrfProtection = require('../helpers/csrfProtection')

router.route('/register')
    .get(csrfProtection, usrCtrl.registerComponnet)
    .post(usrCtrl.createUsr)

router.route("/contact%20us")
    .get(csrfProtection, usrCtrl.contactUsComponnet)
    .post(usrCtrl.enterMessage)

module.exports = router;