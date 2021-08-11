const express = require('express')
const downCtrl = require('../controllers/download.controller')
const storageSystem = require('../helpers/storageSystem')
const limiter = require('../helpers/limiter')
const router = express.Router();
const authCtrl = require('../controllers/auth.controller')
const csrfProtection = require('../helpers/csrfProtection')


router.route('/admin')
    .get(limiter, authCtrl.requireSignIn,csrfProtection,  downCtrl.getHomeAdmin)
    .post(authCtrl.requireSignIn, storageSystem(), downCtrl.postHomeAdmin) 
     // u should use this |
    // .get(authCtrl.requireSignIn ,downCtrl.getAdmin)
    // .post(authCtrl.requireSignIn, authCtrl.hasAuthorization ,storageSystem(), downCtrl.postAdmin) 

router.route('/admin/engineering')
    .get(limiter,authCtrl.requireSignIn, csrfProtection,  downCtrl.getEngAdmin)
    .post(authCtrl.requireSignIn, storageSystem(), downCtrl.postEngAdmin)

router.route('/admin/programming')
    .get(limiter,authCtrl.requireSignIn, csrfProtection, downCtrl.getProgamAdmin)
    .post(authCtrl.requireSignIn, storageSystem, downCtrl.postProgAdmin)

router.route('/admin/marketing')
    .get(limiter,authCtrl.requireSignIn, csrfProtection, downCtrl.getMarketAdmin)
    .post(authCtrl.requireSignIn, storageSystem(), downCtrl.postMarketAdmin)



module.exports = router;