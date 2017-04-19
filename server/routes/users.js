var express = require('express');
var router = express.Router();
var userModels = require('../models/UserModels');
var connPools = require('../models/ConnPools');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
    //http://localhost:3123/users/ 页面输出
    res.send('respond with a resource');
});*/

router.get('/list_user', function (req, res) {
    console.log("list_user GET 请求");
    res.send('用户列表页面');
});

router.all('/login', function(req, res) {
    //userModels.login(req,res);
    subflag = req.body['subflag'];
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
    nickname = req.body['nickname'];
    console.log("post:"+ nickname);
    userModels.register(req,res);
});

module.exports = router;
