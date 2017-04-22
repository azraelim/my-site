/**
 * Created by Administrator on 2017/4/10.
 */
/**
 * Created by Administrator on 2017/4/3.
 */
/**
 * Created by Administrator on 2017/3/20.
 */
var connPool = require("./ConnPools");
var async = require("async");


module.exports={
    addMessage:function(req,res){
        var loginbean = req.session.loginbean;
        var pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function(err,conn){
            var userAddSql = 'insert into message (content,nickname,createtime) values(?,?,current_timestamp)';
            var param = [req.body['content'],req.body['nickname']];
            //console.log("--content"+req.body['content'])
            //非空检查
            if(req.body['nickname'] == ""){
                res.send("<script>alert('请留名！');window.location.href = 'http://'+window.location.hostname+':3123/#/message/';</script>");
                return;
            }else if(req.body['content'] == ""){
                res.send("<script>alert('请输入留言！');window.location.href = 'http://'+window.location.hostname+':3123/#/message/';</script>");
                return;
            }

            conn.query(userAddSql,param,function(err,rs){
                if(err){
                    //console.log('insert err:',err.message);
                    res.send("数据库错误,错误原因:"+err.message);
                    return;
                }
                res.send("<script>alert('添加留言成功');window.location.href = 'http://'+window.location.hostname+':3123/#/message/';</script>");
                //res.redirect('../');
            })
            conn.release();
        });
    },
    MessageList:function(req,res,loginbean) {
        var pool = connPool();
        //从pool中获取连接(异步,取到后回调)
        pool.getConnection(function (err, conn) {
            if (err) {
                //console.log('insert err:',err.message);
                res.send("获取连接错误,错误原因:" + err.message);
                return;
            }
            page = 1;
            if (req.query['page'] != undefined) {
                page = parseInt(req.query['page']);
                if (page < 1) {
                    page = 1;
                }
            }
            //每页显示的问题数量
            var pageSize = 10;
            if (req.query['pageSize'] != undefined) {
                pageSize = parseInt(req.query['pageSize']);
            }

            //每页开始的问题编号
            var pointStart = (page - 1) * pageSize;
            var count = 0;
            var countPage = 0;
            var countSql = 'select count(*) as count from message';
            var listSql = "select messageid,content,date_format(createtime,'%Y-%c-%d %T') as createtime,nickname from message order by messageid desc limit ?,?";
            var param = [pointStart, pageSize];

            async.series({
                one: function (callback) {
                    conn.query(countSql, [], function (err, rs) {
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
                        callback(null, rs);
                    })
                }
            }, function (err, results) {
                //console.log(results);

                rs = results['two'];

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
    }
};