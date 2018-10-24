var express = require('express')
var router = express.Router()
var common = require('../config/common')
var fs = require("fs")


/* GET home page. */
router.get('/', function(req, res) {
    var result = {
        code: 200,
        data: 'express'
    };
    console.log(result);
    res.send(result);
});

module.exports = router;