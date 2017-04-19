/**
 * Created by Administrator on 2017/3/23.
 */
var https = require('https');
var cheerio = require("cheerio");

var url = 'https://twitter.com/realDonaldTrump?lang=zh-cn';

https.get(url , function(res){
    console.log('状态码：', res.statusCode);
    //console.log('请求头：', res.headers);

    res.on('data', function(d){
        //d 为buffer文件
        //process.stdout.write(data);
        var data = filterChapters(d.toString());
        printCourseInfo(data);
    });
    //printCourseInfo(data);
}).on('error', function(e){
    console.error(e);
});

function filterChapters(html){
    var $ = cheerio.load(html);
    var twitters = $(".js-stream-item");

    var twitterData = [];
    twitters.each(function(item){
        var names = $('.show-popup-with-id').text().trim();
        var contents = $('.js-tweet-text').text().trim();
        var time = $('.js-short-timestamp').text().trim();

        var twitter = {
            name : names,
            content:contents,
            time:time
        };

        twitterData.push(twitter);
    });

    return twitterData;
}

function printCourseInfo(twitterData){
    twitterData.forEach(function(item){
        var name = item.name;
        console.log(name+'\n');
        var content = item.content;
        console.log(content+'\n');
        var time = item.time;
        console.log(time+'\n');
    })
}