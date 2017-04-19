<template>

    <div class="rightslide">

        <ul class="notelist" v-for="item in items">
            <li @click="getnote()">
                <router-link :item="item" :to="{ path:'/notes/detail',query:{noteid:item.noteid}}">
                    {{item.title}}
                </router-link>
            </li>
        </ul>
    </div>

</template>

<script>
    import getQueryString from '../js/getQueryString.js'

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

        }
    },
    mounted()
    {
        self = this;
        this.getnote();
    },
    methods:{
        getnote:function(){

            var url = "http://"+window.location.hostname+":3123/note?pageSize=20&typeid=10";

            $.ajax({
                type: "get",
                async: false,
                url: url,
                dataType: "jsonp",
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                success: function(json){
                    self.items = json.rs;
                },
                error: function(){
                    console.log('ajax of rightslide fail');
                }
            });
        },
    }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .rightslide {
        width: 20%;
        height: 100%;
        float: right;
        background-color: #DEEBF7;
    }

    .notelist {
        position: relative;
        top: 100px;
        width: 80%;
        padding-left: 30px;
        list-style: none;
    }

    .notelist li {
        display: block;
        margin-bottom: 15px;
        line-height: 20px;
        text-align: left;
    }
    .notelist a {
        color: #000;
    }
    @media only screen and   (max-width:768px) {
        .rightslide {
            display: none;
        }
    }
</style>
