<template>
    <div>

        <nav class="navbar navbar-inverse" role="navigation">
            <div class="container-fluid">
                <!--for mobile device-->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar_head">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" id="brand">
                        <router-link to="/">蔡灏的个人小站</router-link>
                    </a>
                </div>

                <!--nav links & content-->
                <div class="collapse navbar-collapse" id="navbar_head">
                    <ul class="nav navbar-nav navlist" id="navlist">

                        <li>
                            <router-link to="/imitate">首页仿写</router-link>
                        </li>

                        <li>
                            <router-link to="/ife/">js实践</router-link>
                        </li>


                        <li v-if="admin == true">
                            <router-link :to="{name:'master', params: {typeid:10}}">添加我的笔记</router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'note', query: {typeid:10}}">随笔&心得</router-link>
                        </li>


                        <li><router-link to="/message/">留言板(无需登录)</router-link></li>


                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                添加笔记(需登录)
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" id="messageboard" role="menu">
                                <li><router-link :to="{name:'master', params: {typeid:11}}">添加笔记</router-link></li>

                                <li><router-link :to="{name:'note', query: {typeid:11}}">查看笔记</router-link></li>
                            </ul>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav navbar-right">
                        <template v-if="logged == true">
                            <li class="welcome"><span>欢迎！</span></li>
                            <li>
                                <button class="btn btn-default" type="submit">
                                    <span class="glyphicon glyphicon-user">&nbsp;</span><span>{{username}}</span>
                                </button>
                            </li>
                            <li>
                                <button type="submit" class="btn btn-default" id="log_out" @click="logout()">注销</button>
                            </li>
                        </template>
                        <template v-else>
                            <li>
                                <button type="submit" class="btn btn-default" id="log_on" data-toggle="modal"
                                        data-target="#loginpad">登录
                                </button>
                            </li>
                            <li>
                                <button type="submit" class="btn btn-default" id="register" data-toggle="modal"
                                        data-target="#registerpad">注册
                                </button>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>
        <loginpad></loginpad>
        <registerpad></registerpad>
    </div>
</template>

<script>
    function changeNavColor() {
        var $navlist = $("#navlist li");
        $navlist.each(function (index, ele) {
            $(ele).click(function () {
                $navlist.each(function (index, ele) {
                    $(ele).attr("class", "");
                });
                $(ele).attr("class", "active");
            })
        });
        var $brand = $("#brand");
        $brand.click(function () {
            $navlist.each(function (index, ele) {
                $(ele).attr("class", "");
            });
        })
    }

    export default {
        props: ['logged', 'username','admin'],
        data ()
    {

        return {
            /*username:username,*/

        }
    }
    ,
    created()
    {

    }
    ,
    mounted()
    {
        this.access();
        changeNavColor();
    }
    ,
    methods:{
        logout:function () {
            var url = "http://"+window.location.hostname+":3123/logout";
            $.ajax({
                type: "get",
                async: true,
                xhrFields:{withCredentials:true},
                url: url,
                dataType: "json",
                success: function(json){
                    alert('注销成功');
                    window.location.href = 'http://'+window.location.hostname+':3123';
                },
                error: function(){
                    console.log('logincheck ajax send failed!');
                }
            });
        },
        access:function () {

        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    nav {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 10;
    }

    .container-fluid {
        padding: 0 50px 0 60px;
    }

    #brand a {
        color: #fff;
        text-decoration: none;
    }

    .navbar-right {
        position: relative;
        top: 7px;
    }

    .btn-default {
        margin-left: 10px;
        outline: none;
    }

    #navbar_head {

    }

    .navlist a {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #aaa;
        text-decoration: none;
    }

    .navlist a:hover {
        color: #fff;
    }
    #messageboard li{
        text-align: center;
    }
    #messageboard a{
        color: #000;
    }
    #messageboard a:hover{
        color: #666;
    }
    #log_on {
        width: 80px;
    }

    #register {
        width: 80px;
    }

    .welcome {
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        margin-left: 10px;
        font-size: 16px;
        color: #fff;
    }

    .active a {
        color: #fff;
    }
    @media only screen and (max-width: 768px){
        #messageboard a{
            color: #ccc;
        }
    }
</style>
