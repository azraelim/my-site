<template>
    <div id="app">
        <topnav v-bind:logged="islogged" v-bind:username="nickname" v-bind:admin="isadmin"></topnav>

        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import Topnav from './components/Topnav'
    import Loginpad from './components/Loginpad'
    import registerpad from './components/Registerpad'
    import Index_page from './components/Index_page'
    import Notes from './components/Notes';
    import Master from './components/Master';
    import Article_pre from './components/Article_pre';
    import Note_detail from './components/Note_detail';
    import Note_list from './components/Note_list';
    import Rightslide from './components/Rightslide';
    import Message from './components/MessageBoard';
    import Imitate from './components/Imitate.vue';
    import IFETraning from './components/IFETraning.vue';


    Vue.component('topnav', Topnav);
    Vue.component('loginpad', Loginpad);
    Vue.component('registerpad', registerpad);
    Vue.component('index-page', Index_page);
    Vue.component('notes', Notes);
    Vue.component('master', Master);
    Vue.component('art-pre', Article_pre);
    Vue.component('note-detail', Note_detail);
    Vue.component('note-list', Note_list);
    Vue.component('rightslide', Rightslide);
    Vue.component('messages', Message);
    Vue.component('imitate', Imitate);
    Vue.component('ife', IFETraning);


    function checklogged(loginbean) {
        if (loginbean == undefined) {
            return false;
        } else {
            return true;
        }
    }

    var self;
    export default {
        name: 'app',
        data ()
        {
            self = this;
            return {
                islogged: "",
                nickname: "",
                isadmin:false
            }
        },
        computed(){

        },
        created(){

        },
        mounted(){
            //loginbean = getsession();
            this.checksession();
        },
        methods: {
            checksession:function(){
                var url = "http://"+window.location.hostname+":3123/check"
                var resp = "";
                $.ajax({
                    type: "get",
                    async: false,
                    url: url,
                    dataType: "jsonp",
                    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                    success: function(json){
                        self.islogged = checklogged(json.loginbean);
                        if(self.islogged){
                            self.nickname = json.loginbean.nickname
                            if(self.nickname == "admin"){
                                self.isadmin = true;
                            }else{
                                self.isadmin = false;
                            }
                        }
                    },
                    error: function(){
                        console.log('checksession failed');
                    }
                });
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
