var express = require('express');
var router = express.Router();
var userModels = require('../models/UserModels');
var connPools = require('../models/ConnPools');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
    //http://localhost:3123/users/ 页面输出
    res.send('respond with a resource');
});*/

router.all('/login', function(req, res) {
    //userModels.login(req,res);
    var subflag = req.body['subflag'];
    if(subflag==undefined){
        res.render('error');
    }else{
        if(req.body['anonymous'] == "true"){
            userModels.anonymous(req,res);
        }else{
            userModels.login(req,res);
        }
    }
});

router.post('/register', function(req, res) {
    var nickname = req.body['nickname'];
    console.log("post:"+ nickname);
    userModels.register(req,res);
});

module.exports = router;
