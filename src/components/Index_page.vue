<template>
    <div id="page1" class="container-fluid">

    <div class="btns">
        <div class="forme wave">
            <div class="wave1"></div>
            <div class="wave2"></div>
            <div class="wave3"></div>
            <button @click="clickme()">关于我</button>
        </div>
        <div class="forsite wave">
            <div class="wave1"></div>
            <div class="wave2"></div>
            <div class="wave3"></div>
            <button @click="clicksite()">关于本站</button>
        </div>
    </div>


    <div class="aboutme col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2" v-show="aboutme">
        <div class="profile">
            <div class="self">
                <p>我叫<strong>蔡灏</strong>，是一名WEB前端开发人员</p>
                <p>能够熟练使用 HTML、CSS、Javascript开发符合 W3C 标准、兼容主流浏览器的页面</p>
                <p>熟悉响应式网页开发,保证网页在不同分辨率下合理显示</p>
                <p>熟练使用jQuery框架及原生js实现网页特效</p>
                <p>熟悉bootstrap、vue框架，能在相关api文档的支持下完成网页或组件开发</p>
                <p>熟悉node.js,能在express框架下进行简单的后端开发</p>
                <p>了解mysql，能编写简单的sql语句供网站使用，了解nginx及网站部署</p>
            </div>

        </div>

        <div id="introduce">
            <ul class="list">
                <li><span>姓名</span> | 蔡灏 </li>
                <li>
                    <span>邮箱</span> | <a href="mailto:380219162@qq.com">380219162@qq.com</a>
                </li>
                <li><span>所在地</span> | 山东 - 青岛</li>
                <li><span>GitHub</span> | <a href="http://github.com/azraelim">点击进入</a> </li>
            </ul>
        </div>
    </div>

    <div class="aboutsite col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2" v-show="aboutsite">
        <div class="site">
            <p>本站前端主要使用Vue2框架进行开发，使用了bootstrap框架的一些样式和组件，使用了jQuery2.1.4</p>
            <p>在ie9+ chrome Firefox浏览器下测试通过</p>
            <p>通过bootstrap栅格系统配合媒体查询完成响应式布局，主要页面能适应页面宽度360px+的浏览器</p>
            <p>后台使用node.js,通过express框架构建，目前完成了注册、登录、发言、评论等功能，
                添加笔记页面使用了<a href="https://github.com/pandao/editor.md">editor</a>以支持markdown，
                通过<a href="https://github.com/chjj/marked">marked.js</a>转换为html输出到前端</p>
            <p>数据库使用mysql,前后端使用ajax进行交互</p>
        </div>

        <div class="usage">
            <p class="black">本站目前实现的功能：</p>
            <p>本站
                <router-link to="/imitate">首页仿写</router-link>
                和<router-link to="/ife/">js实践</router-link>
                部分为练习作品
            </p>
            <p>
                <router-link :to="{name:'note', params: {typeid:10}}">随笔&心得</router-link>
                部分为本人学习过程中的一些心得笔记
            </p>
            <p>
                登录后可以在
                <router-link :to="{name:'master', params: {typeid:11}}">这里</router-link>
                添加笔记
                在
                <router-link :to="{name:'note', params: {typeid:11}}">这里</router-link>
                可以查看您添加的笔记
            </p>
            <p>
                如果您有什么意见和建议，可以在无需登录的
                <router-link to="/message/">留言板</router-link>
                留言
            </p>
            <p>匿名登录功能还在试验中，可能出现问题</p>
        </div>
    </div>



        <div class="footer">
            <span>欢迎来到小站，您是第{{num}}位访客，当前正在使用{{category}}浏览器，浏览器窗口实际宽度为{{width}}px，高度为{{height}}px，dpr(设备像素比)为{{dpr.toFixed(2)}}</span>
        </div>

    </div>
</template>

<script>
    import browser from '../js/getbrowser'
    var self;
    export default {


        data () {
            return {
                width: browser.width,
                height: browser.height,
                category:browser.browser,
                ua: browser.ua,
                dpr:browser.dpr,
                aboutme:true,
                aboutsite:false,
                num:""
            }
        },
        mounted(){

            self = this;
            this.counter();
            var $waves = $(".wave");
            $waves.each(function(index,ele) {
                $(ele).mouseenter(function(){
                    $(ele).attr("class",function(index,oldvalue){
                        return oldvalue+" animate"
                    })
                })
                $(ele).mouseleave(function(){
                    $(ele).attr("class",function(index,oldvalue){
                        var reg = new RegExp('(\\s|^)' + "animate" + '(\\s|$)');
                        return oldvalue.replace(reg, ' ');
                    })
                })
            })

        },
        methods:{
            clickme:function(){
                self.aboutme = true;
                self.aboutsite = false;
            },
            clicksite:function(){
                self.aboutme = false;
                self.aboutsite = true;
            },
            counter:function(){
                var url = "http://"+window.location.hostname+":3123/counter";
                $.ajax({
                    type: "get",
                    async: true,
                    xhrFields:{withCredentials:true},
                    url: url,
                    dataType: "json",
                    success: function(json){
                        self.num = json.result[0].num;
                    },
                    error: function(){
                        console.log('logincheck ajax send failed!');
                    }
                });
            }
        }
    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #page1{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #85AD92;
    }
    #page1 p{
        font-size: 18px;
    }
    .profile{
        margin-top: 10px;

        text-align: left;
        padding: 10px 15px;
        color: #000;
    }
    #introduce{
        margin-top: 20px;
        margin-bottom: 30px;
    }
    #introduce ul{
        width: 300px;
        margin: 0 auto;
        list-style: none;
    }
    #introduce li{
        height: 35px;
        text-align: left;
        color: black;
    }
    #introduce span{
        display: inline-block;
        width: 80px;
        text-align: right;
        color: black;
    }
    #introduce a{
        color: black;
    }
    .site,.usage{
        margin-top: 20px;
        text-align: left;
        padding: 10px 15px;
        color: #fff;
    }
    .usage{
        margin-bottom: 30px;
    }
    .site a,.usage a{
        color: #049;
    }
    .footer{
        position: fixed;
        bottom: 0;
        right: 150px;
    }
    .footer span{
        color: #7a3a17;
    }
    .btns{
        position: relative;
        width: 280px;
        height: 120px;
        margin: 55px auto 0;
    }
    .forme{
        position: absolute;
        top: 0;
        left: 10px;
    }
    .forme button{
        position: absolute;
        top: 20px;
        right: 20px;
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 200px;
        /*border: 1px solid #008;*/
        border: none;
        background-color: #7f7192;
        outline: none;
        color: #fff;
        font-size: 20px;

        -webkit-box-shadow: 3px 3px 3px 1px rgba(127,113,146,0.7);
        -moz-box-shadow: 3px 3px 3px 1px rgba(127,113,146,0.7);
        box-shadow: 3px 3px 3px 1px rgba(127,113,146,0.7);
    }
    .forme button:hover{
        background-color: #8f82a1;
    }
    .forsite{
        position: absolute;
        top: 0;
        right: 10px;
    }
    .forsite button{
        position: absolute;
        top: 20px;
        right: 20px;
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 200px;
        border: none;
        background-color: #fc0;
        outline: none;
        font-size: 16px;

        -webkit-box-shadow: 3px 3px 3px 1px rgba(127,113,146,0.7);
        -moz-box-shadow: 3px 3px 3px 1px rgba(127,113,146,0.7);
        box-shadow: 3px 3px 3px 1px rgba(127,113,146,0.7);
    }
    .forsite button:hover{
        background-color: #f4c444;
    }
    .wave{
        display: inline-block;
        width: 120px;
        height: 120px;
    }
    @-webkit-keyframes waves{
        0% {
            width:80px;height:80px;top:20px;left:20px;
            border-radius: 80px;
            border: 3px solid rgba(255,255,255,1);
        }
        100% {
            width:120px;height:120px;top:0;left:0;
            border-radius: 120px;
            border: 1px solid rgba(255,255,255,0);
        }
    }
    @keyframes waves
    {
        0% {
            width:80px;height:80px;top:20px;left:20px;
            border-radius: 80px;
            border: 3px solid rgba(255,255,255,1);
        }
        100% {
            width:120px;height:120px;top:0;left:0;
            border-radius: 120px;
            border: 1px solid rgba(255,255,255,0);
        }
    }

    @-o-keyframes waves /* Opera */
    {
        0% {
            width:80px;height:80px;top:20px;left:20px;
            border-radius: 200px;
            border: 3px solid rgba(255,255,255,1);
        }
        100% {
            width:120px;height:120px;top:0;left:0;
            border-radius: 200px;
            border: 1px solid rgba(255,255,255,0);
        }
    }
    .wave1{
        position: absolute;
        visibility:visible;
        animation:waves 2s infinite;
        -webkit-animation:waves 2s infinite;
        border: 3px solid rgba(255,255,255,0);

    }
    .animate .wave2{
        position: absolute;
        border: 3px solid rgba(255,255,255,0);
        animation:waves 1.5s;
    }
    .animate .wave3{
        visibility:visible;
        position: absolute;
        border: 3px solid rgba(255,255,255,0);
        animation:waves 1.5s infinite;animation-delay:.3s;
    }
    @media only screen and   (max-width:768px) {
        .footer{
            display: none;
        }
    }

    @import "../css/common.css"
</style>
