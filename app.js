var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./server/routes/index');
var users = require('./server/routes/users');
var note = require('./server/routes/note');
var messages = require('./server/routes/message');
var app = express();

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://www.onsun.xyz');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method == 'OPTIONS') {
        res.send(200); //让options请求快速返回/
    }
    else {
        next();
    }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*app.engine('html', require('ejs').__express);
app.set('view engine', 'html');*/

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser({uploadDir:'./uploadtemp'}));
app.use(cookieParser());

app.use(session({secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 20 * 60 * 1000 }, //cookie生存周期20*60秒
    resave: true,  //cookie之间的请求规则,假设每次登陆，就算会话存在也重新保存一次
    saveUninitialized: true //强制保存未初始化的会话到存储器
}));  //这些是写在app.js里面的

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/note', note);
app.use('/message', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
