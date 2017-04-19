var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var NoteModel = require('../models/NoteModel');
var MessageModel = require('../models/MessageModel');

/* GET home page. */
router.all('/', function(req, res) {
    loginbean = req.session.loginbean ;
    //console.log("--loginbean:"+loginbean);
    console.log("--session:"+req.session.loginbean);
    //res.jsonp({loginbean});
    res.render("index")
});

router.all('/index', function(req, res) {
    loginbean = req.session.loginbean ;
    //console.log("--loginbean:"+loginbean);
    console.log("--session:"+req.session.loginbean);
    //res.jsonp({loginbean});
    res.render("index")
});
router.all('/check', function(req, res) {
    loginbean = req.session.loginbean ;
    //console.log("--loginbean:"+loginbean);
    console.log("--session:"+req.session.loginbean);
    res.jsonp({loginbean});
});

//----注销session
router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        //res.send("location.href='/index';");
        console.log("logout");
        res.send("<script>alert('注销成功');window.location.href = 'http://'+window.location.hostname+':3123';</script>");
    })
});

router.get('/master',function(req,res){
    res.render("master");
});
router.get('/writenote',function(req,res){
    res.render("writenote");
});

router.get('/note',function(req,res){
    loginbean = req.session.loginbean ;
    console.log("--session:"+req.session.loginbean);
    NoteModel.noteList(req,res,loginbean)
});

router.get('/message',function(req,res){
    loginbean = req.session.loginbean;
    MessageModel.MessageList(req,res,loginbean)
});



module.exports = router;
