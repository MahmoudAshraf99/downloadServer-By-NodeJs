const express = require("express")
const authCtrl = require("../controllers/auth.controller")
const csrfProtection = require('../helpers/csrfProtection')
const router = express.Router();


router.route("/auth")
    .get(csrfProtection, authCtrl.getAuth)
    .post(authCtrl.signIn)


router.route("/signout").get(authCtrl.signOut)

module.exports = router;
