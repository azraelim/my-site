<template>
    <div class="notes">
            <div class="notewrap">
                <div class="title">
                    <span>
                        {{item.title}}
                    </span>
                </div>
                <div class="info">
                    <span>
                        <span class="infom">作者：<span class="black">{{item.nickname}}</span></span>
                        &nbsp;
                        <span class="infom">发表时间：<span class="black">{{item.createtime}}</span></span>
                    </span>
                </div>
                <div class="content">
                    <article id="hcontent">

                    </article>
                </div>
            </div>

            <div class="commentlist" v-show="hasreply"  v-for="reply of replys">
                <div class="commentwrap">
                    <div class="comments">
                        <div class="reply">
                            {{reply.content}}
                        </div>
                    </div>

                    <div class="commentinfo clearfix">
                    <span>
                        <span class="infom rep">回复者：<span class="black">{{reply.nickname}}</span></span>
                        &nbsp;
                        <span class="infom rep">回复时间：<span class="black">{{reply.createtime}}</span></span>
                    </span>
                    </div>
                </div>
            </div>


            <div class="replywrap">
                <form :action="actionurl" method="post">
                    <textarea name="content" id="wreply"></textarea>
                    <input type="hidden" name="subflag" value="1"/>
                    <input type="hidden" name="noteid" :value="noteid"/>
                    <input type="submit" value="评论"/>
                </form>
            </div>
    </div>
</template>

<script>
    var marked = require('marked');

    var htmlcontent;
    var self;
    export default {
        data ()
        {
            self = this;
            return {
                item:"",
                replys:[],
                reply:{
                    content:"",
                    nickname:"",
                    createtime:""
                },
                noteid:"",
                hasreply:false,
                actionurl:"http://"+window.location.hostname+":3123/note/reply"
            }
        },
        mounted()
        {
            this.getnote();
        },
        methods:{
            getnote:function(){
                var id = self.$route.query.noteid;
                var url = "http://"+window.location.hostname+":3123/note/detail?noteid="+id;
                self.noteid = id;
                var resp = "";
                $.ajax({
                    type: "get",
                    async: true,
                    url: url,
                    dataType: "jsonp",
                    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                    success: function(json){
                        resp = json;
                        //获取note
                        self.item = resp.rs[0];
                        //获取note reply
                        //console.log(resp.rsReply[0]);
                        if(resp.rsReply[0] != undefined){
                            self.replys = resp.rsReply;
                            self.hasreply = true;
                        }else{
                            self.hasreply = false;
                        }

                        htmlcontent = marked(self.item.content);
                        var hcontent = document.getElementById("hcontent");

                        if(hcontent==null){return;}
                        hcontent.innerHTML = htmlcontent;
                    },
                    error: function(){
                        console.log('ajax of getNoteDetail failed');
                    }
                });
            }
        },
        watch: {
            '$route': function(newVal, oldVal) {
                self.getnote();
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .notes {
        position: absolute;
        top: 100px;
        left: 10%;
        width: 60%;
    }
    .notewrap{
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #fff;
    }
    .notewrap span{
        font-size: 16px;
    }
    .title {
        position: relative;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
    }
    .title span{
        display: inline-block;
        font-size: 20px;
        margin-left: 20px;
    }
    .info{
        position: relative;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
    }
    .infom{
        display: inline-block;
        margin-left: 20px;
        color: #ff1c1c;
    }
    .content{
        position: relative;
        text-align: left;
        margin-top: 3px;
        overflow: hidden;
    }
    .content article{
        margin-left: 20px;
        margin-right: 10px;

        display: inline-block;
        font-size: 16px;
        line-height: 25px;
    }
    .commentwrap{
        position: relative;
        margin-top: 50px;

        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #fff;
    }
    .comments{
        padding-left: 20px;
        border-bottom: 1px solid #ccc;
        text-align: left;
    }
    .commentinfo{
        padding-right: 20px;
        border-radius: 10px;
        background-color: #fff;
        text-align: right;
    }
    .replywrap{
        margin-top: 50px;

    }
    #wreply{
        display: block;
        float: left;
        width: 100%;
        height: 100px;
    }
    .replywrap input{
        position: relative;
        top: 20px;
        display: block;
        padding: 6px 20px;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #fff;
        background-color: #428bca;
    }
    .black{
        color:#000;
    }
    @media only screen and   (max-width:768px) {
        .notes {
            position: absolute;
            top: 100px;
            left: 5%;
            width: 90%;
        }
        .info{
            position: relative;
            height: 50px;
            line-height: 25px;
            border-bottom: 1px solid #ccc;
        }

        .commentinfo{
            text-align: left;
            padding-right: 20px;
            border-radius: 10px;
            background-color: #fff;
        }
        .commentinfo span{
            display: inline-block;
            float: left;
        }
        .infom{
            display: block;
            float: left;
        }
        .rep{
            display: inline-block;
            margin-left: 20px;
            color: #ff1c1c;
        }
        span.black{
            float: none;
        }
    }

    @import "../css/common.css"
</style>
