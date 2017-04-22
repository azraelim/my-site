/**
 * Created by Administrator on 2017/4/3.
 */
/**
 * Created by Administrator on 2017/3/20.
 */
var connPool = require("./ConnPools");
var async = require("async");
var marked = require('marked');


module.exports={
    noteSave:function(req,res){
        var loginbean = req.session.loginbean;
        var pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            var userAddSql = 'insert into note (typeid,typename,title,content,uid,nickname,createtime) values(?,?,?,?,?,?,current_timestamp)';
            var param = [req.body['typeid'],req.body['typename'],req.body['title'],req.body['content'],loginbean.id,loginbean.nickname];
            
            console.log("typeid-->"+req.body['typeid'],"typename-->"+req.body['typename'],"title-->"+req.body['title'],req.body['content']);
            conn.query(userAddSql,param,function(err,rs){
                /*if(err){
                    //console.log('insert err:',err.message);
                    res.send("数据库错误,错误原因:"+err.message);
                    return;
                }*/
                //res.send("<script>alert('保存笔记成功');window.location.href = 'http://'+window.location.hostname+':3123/#/notes/';</script>");
               var sends = {
                    notestatus:false,
                    err:""
                };
                if(err){
                    sends.err = err.message;
                    sends.notestatus = false;
                    res.jsonp(sends);
                    return;
                }
                sends.notestatus = true;
                res.jsonp(sends);
            })
            conn.release();
        });
    },
    noteList:function(req,res,loginbean) {
        var pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function (err, conn) {
            if (err) {
                //console.log('insert err:',err.message);
                res.send("获取连接错误,错误原因:" + err.message);
                return;
            }
            var page = 1;
            if (req.query['page'] != undefined) {
                page = parseInt(req.query['page']);
                if (page < 1) {
                    page = 1;
                }
            }
            //每页显示的问题数量
            var pageSize = 4;
            if (req.query['pageSize'] != undefined) {
                pageSize = parseInt(req.query['pageSize']);
            }

            //笔记分类，10为admin笔记，11为游客笔记
            var typeid = 11;
            if(req.query['typeid'] != undefined){
                typeid = parseInt(req.query['typeid']);
            }

            //每页开始的问题编号
            var pointStart = (page - 1) * pageSize;
            var count = 0;
            var countPage = 0;
            var countSql = "select count(*) as count from note where typeid=?";
            var type = [typeid]
            var listSql = "select noteid,title,content,looknum,renum,finished,updtime,createtime from note where typeid=? order by noteid desc limit ?,?";
            var param = [typeid,pointStart, pageSize];

            async.series({
                one: function (callback) {
                    conn.query(countSql, type, function (err, rs) {
                        if(err){
                            console.log('select count err:',err.message);
                            return;
                        }
                        count = rs[0]["count"];
                        countPage = Math.ceil(count / pageSize);
                        if (page > countPage) {
                            page = countPage;
                            pointStart = (page - 1) * pageSize;
                            param = [pointStart, pageSize];
                        }
                        callback(null, rs);
                    })
                },
                two: function (callback) {
                    conn.query(listSql, param, function (err, rs) {
                        if(err){
                            console.log('select note err:',err.message);
                            return;
                        }
                        callback(null, rs);
                    })
                }
            }, function (err, results) {
                //console.log(results);

                var rs = results['two'];

                //page默认为1，可由前端传入
                //rs为结果集，包含第page个页面的文章信息
                //count为文章总数
                //countPage为页数
                var result = {loginbean: loginbean, page: page, rs: rs, count: count, countPage: countPage}
                res.jsonp(result);
                //res.send('查完');
            });
            conn.release();
        });
    },
    noteDetail:function(req,res){
        var noteid = req.query['noteid'];
        console.log("--noteid:"+noteid)
        var loginbean = req.session.loginbean;
        if(noteid!=undefined){
            var sqlupd = 'update note set looknum=looknum+1 where noteid=?';
            var sqldetail = "select noteid,title,content,uid,nickname,looknum,renum,finished,updtime,date_format(createtime,'%Y-%c-%d %T') as createtime from note where noteid=?";
            var sqlReplys="select replyid,content,uid,nickname,date_format(createtime,'%Y-%c-%d') as createtime from reply where noteid=?";
            var param=[noteid];
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
                async.series({
                    one: function(callback){
                        conn.query(sqlupd,param,function(err,rs){
                            callback(null, rs);
                        })
                    },
                    two: function(callback){
                        conn.query(sqldetail,param,function(err,rs){
                            callback(null, rs);
                        })
                    },
                    three:function(callback){
                        conn.query(sqlReplys,param,function(err,rs){
                            callback(null, rs);
                        })
                    }
                },function(err, results) {
                    var rs=results['two'];
                    var rsReply = results['three'];
                    var result ={loginbean:loginbean,rs:rs,rsReply:rsReply}
                    res.jsonp(result);
                });

                conn.release();
            });
        }else{
            res.send('unknown noteid!');
        }
    },
    noteReply:function(req,res){
        //非空检查
        if(req.body['nickname'] == ""){
            res.send("<script>alert('请登录！');window.location.href = 'http://'+window.location.hostname+':3123/#/notes/';</script>");
            return;
        }else if(req.body['content'] == ""){
            res.send("<script>alert('请输入回复内容！');window.location.href = 'http://'+window.location.hostname+':3123/#/notes/';</script>");
            return;
        }

        var loginbean = req.session.loginbean;
        var pool = connPool();
        var sqlreply = 'insert into reply (noteid,content,uid,nickname) value(?,?,?,?)';
        var param1=[req.body['noteid'],req.body['content'],loginbean.id,loginbean.nickname];
        var sqlquestion='update note set renum=renum+1 where noteid=?';
        var param2=[req.body['noteid']];
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            if (err) {
                console.log('error on connect with mysql');
                res.send("拿不到连接:"+err);
                return;
            }
            //开始事务处理
            conn.beginTransaction(function (err) {
                if (err) {
                    console.log('error on solve sql');
                    //return callback(err, null);
                    res.send('启动事物处理出错');
                    return;
                }
                async.series([ //串行series,并行parallel
                    function(callback) {
                        conn.query(sqlreply,param1,function(err,rs){
                            if(err){
                                console.log('error:'+err.message);
                                callback(err,1);
                                return;
                            }
                            //console.log('执行第1条完毕');
                            callback(err,rs);//没有则callback(null,1);第2个参数是返回结果
                        });
                    },
                    function(callback) {
                        conn.query(sqlquestion,param2,function(err,rs){
                            if(err){
                                console.log('error:'+err.message);
                                callback(err,2);
                                return;
                            }
                            //console.log('执行第1条完毕');
                            callback(err,rs);//没有则callback(null,1);第2个参数是返回结果
                        });
                    }
                ],function(err, result) {
                    //console.log(result);
                    if(err) {
                        //console.log('调用回滚1');
                        conn.rollback(function() {
                            //throw err;
                        });
                        res.send('数据库错误:'+err);
                        return;
                    }
                    // 提交事务
                    conn.commit(function(err) {
                        if (err) {
                            console.log('调用回滚2');
                            conn.rollback(function() {
                                //throw err;
                            });
                            res.send('数据库错误:'+err);
                            console.log('提交事物出错');
                        }
                        //res.redirect('http://localhost:3222/notes/detail?noteid='+req.body["noteid"]);
                        res.send("<script>alert('回复成功'); window.location.href ='http://'+window.location.hostname+':3123/#/notes/';</script>");
                    });
                });
            });
            conn.release();
        });
    }
};