/**
 * Created by Administrator on 2017/4/3.
 */
/**
 * Created by Administrator on 2017/3/20.
 */
var express = require('express');
var router = express.Router();
var checkSession = require('../jsbean/CheckSession');
var NoteModel = require('../models/NoteModel');


router.all('/save', function(req, res) {
    var loginbean = checkSession.check(req,res);
    if(!loginbean){
        res.send('<script>alert("请登录");window.location.href="http://"+window.location.hostname+":3123";</script>');
        return;
    }
    NoteModel.noteSave(req,res);
});

router.get('/detail', function(req, res) {
    console.log("--detail:")
    NoteModel.noteDetail(req,res);
})

router.post('/reply', function(req, res) {
    var loginbean = checkSession.check(req,res);
    if(!loginbean){return;}
    var subflag = req.body['subflag'];
    if(subflag!=undefined){
        NoteModel.noteReply(req,res);
    }
})

module.exports = router;