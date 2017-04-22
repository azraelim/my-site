var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var NoteModel = require('../models/NoteModel');
var MessageModel = require('../models/MessageModel');
var userModels = require('../models/UserModels');

/* GET home page. */
router.all('/', function(req, res) {
    res.render("index")
});

router.all('/index', function(req, res) {
    res.render("index")
});
router.all('/check', function(req, res) {
    var loginbean = req.session.loginbean ;
    console.log("--session:"+req.session.loginbean);
    res.jsonp({loginbean});
});
router.all('/counter', function(req, res) {
    userModels.counter(req,res);
});

//----注销session
router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
        console.log("logout");
        var sends = {
            status:true
        }
        res.json(sends);
    })
});

router.get('/master',function(req,res){
    res.render("master");
});
router.get('/writenote',function(req,res){
    res.render("writenote");
});

router.get('/note',function(req,res){
    var loginbean = req.session.loginbean ;
    console.log("--session:"+req.session.loginbean);
    NoteModel.noteList(req,res,loginbean)
});

router.get('/message',function(req,res){
    var loginbean = req.session.loginbean;
    MessageModel.MessageList(req,res,loginbean)
});



module.exports = router;
