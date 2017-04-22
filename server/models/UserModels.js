/**
 * Created by Administrator on 2017/3/19.
 */
var connPool = require('./ConnPools');
var loginBean = require('../jsbean/loginBean');
var async = require("async");

module.exports={
    register:function(req,res){
        var pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            if(err){
                //console.log('insert err:',err.message);
                res.send("获取链接错误,错误原因:"+err.message);
                return;
            }
            var userAddSql = 'insert into user (email,pwd,nickname,createtime) values(?,?,?,current_timestamp)';
            var param = [req.body['email'],req.body['pwd'],req.body['nickname']];
            conn.query(userAddSql,param,function(err,rs){
                var sends = {
                    regstatus:0
                };
                if(err){
                    var errStr = err.message;
                    if(errStr.indexOf('emailuniq')>-1){
                        sends.regstatus = 2;
                    }else if(errStr.indexOf('nicknameuiq')>-1){
                        sends.regstatus = 3;
                    }else{
                        //sendStr += "数据库异常，请稍后再试";
                        sends.regstatus = 4;
                    }
                    res.json(sends);

                    return;
                }
                //res.send("注册成功");
                sends.regstatus = 1;
                res.json(sends);
            });
            conn.release();//放回链接池
        });
    },
    login:function(req,res){
        //console.log(req.headers);
        var pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn)
        {
            if(err)
            {
                //console.log('insert err:',err.message);
                res.send("获取连接错误,错误原因:"+err.message);
                return;
            }
            var userSql = 'select uid,nickname from user where nickname=? and pwd=?';
            var param = [req.body['nickname'],req.body['pwd']];
            conn.query(userSql,param,function(err,rs){
                if(err){
                    //console.log('insert err:',err.message);
                    res.send("数据库错误,错误原因:"+err.message);
                    return;
                }
                console.log(rs);
                var sends;
                //console.log(rs.length);
                if(rs.length>0){
                    var loginbean = new loginBean();
                    loginbean.id=rs[0].uid;
                    loginbean.nickname = rs[0].nickname;
                    req.session.loginbean = loginbean;

                    console.log("--loginbean:"+loginbean);
                    console.log("--session:"+req.session.loginbean);
                    var targeturl = req.body['targeturl'];

                    console.log("登录成功");

                    var ip = req.headers['x-forwarded-for'] ||
                        req.connection.remoteAddress ||
                        req.socket.remoteAddress ||
                        req.connection.socket.remoteAddress;

                    console.log(ip)
                    sends = {
                        loginSuccess:true
                    }
                    res.json(sends)
                }else{
                    sends = {
                        loginSuccess:false
                    }
                    res.json(sends)
                }
            })
            conn.release();
        });
    },
    //匿名登录
    anonymous:function(req,res){
        //console.log(req.headers);
        var pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            if(err){
                //console.log('insert err:',err.message);
                res.send("获取链接错误,错误原因:"+err.message);
                return;
            }

            var ip = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;

            console.log(ip)
            var randomnum = parseInt(1000*Math.random());
            var userAddSql = 'insert into user (email,pwd,nickname,createtime) values(?,?,?,current_timestamp)';
            var param = [ip+randomnum.toString(),"anonymous","匿名用户"+ip+randomnum.toString()];
            var userSql = 'select uid,nickname from user where nickname=? and pwd=?';
            var param2 = ["匿名用户"+ip+randomnum.toString(),"anonymous"];

            async.series({
                one: function (callback) {
                    conn.query(userAddSql,param,function(err,rs){
                        if(err){
                            console.log('insert into user err:',err.message);
                            return;
                        }
                        callback(null, rs);
                    })
                },
                two: function (callback) {
                    conn.query(userSql,param2,function(err,rs){
                        if(err){
                            console.log('select user err:',err.message);
                            return;
                        }
                        callback(null, rs);
                    })
                }
            }, function (err, results) {

                console.log("numnumnumnumnumnumnum---->"+randomnum);
                var rs = results['two'];
                console.log(rs);
                var sends;
                //console.log(rs.length);
                if(rs.length>0){
                    var loginbean = new loginBean();
                    loginbean.id=rs[0].uid;
                    loginbean.nickname = rs[0].nickname;
                    req.session.loginbean = loginbean;

                    console.log("--loginbean:"+loginbean);
                    console.log("--session:"+req.session.loginbean);
                    var targeturl = req.body['targeturl'];

                    console.log("登录成功");

                    sends = {
                        loginSuccess:true,
                        script:'<script>alert("登录成功");</script>'
                    }
                    res.json(sends)
                }else{
                    sends = {
                        loginSuccess:false,
                        script:'<script>alert("用户名或密码错误");</script>'
                    }
                    res.json(sends)
                }
            });
            conn.release();
        });

    },
    counter:function(req,res){
        var pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            if(err){
                //console.log('insert err:',err.message);
                res.send("获取链接错误,错误原因:"+err.message);
                return;
            }

            var ip = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;

            var siteinfo = 'insert into siteinfo (ip,userinfo,createtime) values(?,?,current_timestamp)';
            var param = [ip,"from index"];
            var getnum = 'select count(*) as num from siteinfo';
            async.series({
                one: function (callback) {
                    conn.query(siteinfo,param,function(err,rs){
                        if(err){
                            console.log('insert into siteinfo err:',err.message);
                            return;
                        }
                        callback(null, rs);
                    })
                },
                two: function (callback) {
                    conn.query(getnum,[],function(err,rs){
                        if(err){
                            console.log('select siteinfo err:',err.message);
                            return;
                        }
                        callback(null, rs);
                    })
                }
            }, function (err, results) {

                var rs = results['two'];
                console.log(rs);
                var sends= {
                    checked:true,
                    result:rs
                };
                res.json(sends)
            });
            conn.release();//放回链接池
        });
    },
};

