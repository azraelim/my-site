/**
 * Created by Administrator on 2017/4/10.
 */
var express = require('express');
var router = express.Router();
var checkSession = require('../jsbean/CheckSession');
var MessageModel = require('../models/MessageModel');


router.all('/add', function(req, res) {
    subflag = req.body['subflag'];
    if(subflag!=undefined){
        MessageModel.addMessage(req,res);
    }
});

module.exports = router;