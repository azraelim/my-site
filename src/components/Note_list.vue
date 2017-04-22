<template>
    <div class="notes">

        <!--<div class="nlist">
            <span>点击进入所有文章列表</span>
        </div>-->

        <div id="articles" v-for="item in items">
            <art-pre :item="item"></art-pre>
        </div>

        <div id="list_btn">
            <span id="showpage">当前第 {{page}} 页 &nbsp;&nbsp;&nbsp; 共 {{countPage}} 页</span>
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li @click="getnote()">
                        <router-link :to="{ path:'/notes',query:{page:pre,typeid:typeid}}">
                            <a href="" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </router-link>
                    </li>
                    <li @click="getnote()">
                        <router-link :to="{ path:'/notes',query:{page:showpage,typeid:typeid}}">
                        {{showpage}}
                        </router-link>
                    </li>
                    <li @click="getnote()">
                        <router-link :to="{ path:'/notes',query:{page:showpage+1,typeid:typeid}}">
                        {{showpage+1}}
                        </router-link>
                    </li>
                    <li @click="getnote()">
                        <router-link :to="{ path:'/notes',query:{page:showpage+2,typeid:typeid}}">
                        {{showpage+2}}
                        </router-link>
                    </li>
                    <li @click="getnote()">
                        <router-link :to="{ path:'/notes',query:{page:showpage+3,typeid:typeid}}">
                        {{showpage+3}}
                        </router-link>
                    </li>
                    <li @click="getnote()">
                        <router-link :to="{ path:'/notes',query:{page:showpage+4,typeid:typeid}}">
                        {{showpage+4}}
                        </router-link>
                    </li>
                    <li @click="getnote()">
                        <router-link :to="{ path:'/notes',query:{page:next,typeid:typeid}}">
                            <a href="" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    var items=[];
    var self;
    export default {

        data ()
        {
            return {
                //page为当前页数
                //count为文章总数
                //countPage为页数
                //showpage为最左的按钮数字
                items:"",
                page:"",
                pre:"",
                next:"",
                count:"",
                countPage:"",
                showpage:"",
                typeid:""
            }
        },
        mounted()
        {
            self = this;
            this.getnote();
        },
        methods:{

            getnote:function(){
                var page = self.$route.query.page;
                var type = self.$route.query.typeid;
                self.typeid = self.$route.query.typeid;
                if(!page){
                    page = 1
                }
                if(!type){
                    type = 11
                }
                var url = "http://"+window.location.hostname+":3123/note?page="+page+"&typeid="+type;
                $.ajax({
                    type: "get",
                    async: true,
                    url: url,
                    dataType: "jsonp",
                    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                    success: function(json){
                        var resp = json;
                        self.items = resp.rs;
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
                        console.log('ajax of getnote failed');
                    }
                });
            },
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
        top: 60px;
        left: 10%;
        width: 60%;
        height: 85%;
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
        border-bottom: 1px solid #ccc;
        text-align: left;
    }
    .title span{
        display: inline-block;
        font-size: 20px;
        margin-left: 20px;
    }
    .content{
        position: relative;
        text-align: left;
        max-height: 68px;
        overflow: hidden;
    }
    .content span{
        display: inline-block;
        margin-left: 10px;
    }
    .nlist{
        margin-bottom: 20px;
        border-radius: 10px;
        background-color: #fff;
    }
    .nlist span{
        font-size: 16px;
    }
    #showpage{
        padding: 5px 8px;
        border-radius: 8px;
        background-color: #fff;
    }
    #list_btn{

    }
    .pagination a:focus{
        background-color: #fff;
    }
    @media only screen and   (max-width:768px) {
        .notes {
            left: 5%;
            width: 90%;
        }

    }
</style>
