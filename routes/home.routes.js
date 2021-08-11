const express = require('express')
const downCtrl = require('../controllers/download.controller')

const router = express.Router();

router.route('/')
    .get(downCtrl.getHome)

router.route('/programming')
    .get(downCtrl.getProgramming)


router.route('/engineering')
    .get(downCtrl.getEngineering)

router.route('/marketing')
    .get(downCtrl.getMarketing)

router.route('/books/:postID')
    .get(downCtrl.getHomeDownloadPage)

router.route('/engineering/:postID')
    .get(downCtrl.getEngineeringDownloadPage)


router.route('/marketing/:postID')
    .get(downCtrl.getMarketingDownloadPage)

router.route('/programming/:postID')
    .get(downCtrl.getProgrammingDownloadPage)

router.route('/download')
    .get(downCtrl.downloadFunction)

module.exports = router;