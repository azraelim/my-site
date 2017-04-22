<template>
    <div id="page6">
        <div class="notes">
            <div class="notewrap">
                <div class="title">
                        <span>
                            留言板
                        </span>
                </div>

                <div class="content">
                    <article>
                        这里是留言板，如果您有什么意见、建议或是其他想说的话，可以在这里留言(无需登录)
                    </article>
                </div>
            </div>

            <div class="commentlist" v-for="message of messages">
                <div class="commentwrap">
                    <div class="comments">
                        <div class="reply">
                            {{message.content}}
                        </div>
                    </div>

                    <div class="commentinfo clearfix">
                        <span>
                            <span class="infom">留言者：<span class="black">{{message.nickname}}</span></span>
                            &nbsp;
                            <span class="infom">留言时间：<span class="black">{{message.createtime}}</span></span>
                        </span>
                    </div>
                </div>
            </div>

            <div id="list_btn">
                <span id="showpage">当前第 {{page}} 页 &nbsp;&nbsp;&nbsp; 共 {{countPage}} 页</span>
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li @click="getmessage()">
                            <router-link :to="{ path:'/message',query:{page:pre}}">
                                <a href="" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </router-link>
                        </li>
                        <li @click="getmessage()">
                            <router-link :to="{ path:'/message',query:{page:showpage}}">
                                {{showpage}}
                            </router-link>
                        </li>
                        <li @click="getmessage()">
                            <router-link :to="{ path:'/message',query:{page:showpage+1}}">
                                {{showpage+1}}
                            </router-link>
                        </li>
                        <li @click="getmessage()">
                            <router-link :to="{ path:'/message',query:{page:showpage+2}}">
                                {{showpage+2}}
                            </router-link>
                        </li>
                        <li @click="getmessage()">
                            <router-link :to="{ path:'/message',query:{page:showpage+3}}">
                                {{showpage+3}}
                            </router-link>
                        </li>
                        <li @click="getmessage()">
                            <router-link :to="{ path:'/message',query:{page:showpage+4}}">
                                {{showpage+4}}
                            </router-link>
                        </li>
                        <li @click="getmessage()">
                            <router-link :to="{ path:'/message',query:{page:next}}">
                                <a href="" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="replywrap">
                <form :action="actionurl" method="post">
                    <label for="nickname">您的大名:</label>
                    <input id="nickname" type="text" name="nickname"/>
                    <textarea name="content" id="wreply"></textarea>
                    <input type="hidden" name="subflag" value="1"/>
                    <input id="submit" type="submit" value="评论"/>
                </form>
            </div>


        </div>
    </div>
</template>

<script>
    var self;

    export default {
        data ()
    {
        self = this;
        return {
            messages:[],
            //page为当前页数
            //count为文章总数
            //countPage为页数
            //showpage为最左的按钮数字
            page:"",
            pre:"",
            next:"",
            count:"",
            countPage:"",
            showpage:"",
            actionurl:"http://"+window.location.hostname+":3123/message/add"
        }
    },
    mounted()
    {
        this.getmessage();

    },
    updated(){

    },
    methods:{
        getmessage:function(){
            var page = self.$route.query.page;
            if(!page){
                page = 1
            }
            var url = "http://"+window.location.hostname+":3123/message?page="+page;
            var resp = "";
            $.ajax({
                type: "get",
                async: true,
                url: url,
                dataType: "jsonp",
                jsonp: "callback",
                success: function(json){
                    resp = json;
                    self.messages = resp.rs;

                    self.page = resp.page;
                    self.count = resp.count;
                    self.countPage = resp.countPage;

                    //set page number
                    if(page<=1){
                        self.pre = resp.page;
                    }else{
                        self.pre = resp.page-1;
                    }
                    if(page>=resp.countPage){
                        self.next = resp.page;
                    }else{
                        self.next = resp.page+1;
                    }
                    if(self.page<=3){
                        self.showpage = 1;
                    }else if(self.page >= (self.countPage - 2)){
                        self.showpage = self.countPage - 4
                    }else{
                        self.showpage = self.page - 2;
                    }
                },
                error: function(){
                    console.log('ajax of getMessage failed');
                }
            });
        },
    },
    watch: {
        '$route': function(newVal, oldVal) {
            self.getmessage();
        }
    }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #page6 {
        position: absolute;
        top: 0;
        width: 100%;

        background-color: #85AD92;
    }
    .notes {
        position: absolute;
        top: 100px;
        left: 20%;
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

        overflow: hidden;
    }
    .content article{
        margin-left: 10px;
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
        text-align: left;
    }
    #wreply{
        display: block;
        float: left;
        width: 100%;
        height: 100px;
    }
    #nickname{
        margin-bottom: 20px;
    }
    input#submit{
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

    @media only screen and   (max-width:768px) {
        .notes {
            position: absolute;
            top: 100px;
            left: 5%;
            width: 90%;
        }
        .commentinfo{
            text-align: left;
        }
        .infom{
            display: block;
            float: left;
            padding: 3px 0;
        }
        .reply{
            padding: 3px 0;
        }
    }

    @import "../css/common.css"
</style>
