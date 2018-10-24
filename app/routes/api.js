/**
 * Created by OliveTech on 10/26/2017.
 */
var express = require('express');
var router = express.Router();

var api = require('../controllers/videos');


/* account */
router.get('/video_id/:video_id', api.getVideoInfo)


module.exports = router;
