<template>
    <div class="modal" id="loginpad" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">登录</h4>
                </div>

                    <div class="modal-body">
                        <div class="login">
                            <input id="username" type="text" class="form-control" name="nickname" placeholder="用户名" v-model="username" @change="onchange()" @keyup="onchange()">
                            <span class="warn" v-if="noneUser">请输入用户名</span>

                            <input id="password" type="password" class="form-control" name="pwd" placeholder="密码" v-model="password" @change="onchange()" @keyup="onchange()">
                            <span class="warn" v-if="nonePwd">请输入密码</span>

                            <input type="hidden" name="subflag" value="1"/>
                            <input type="hidden" name="targeturl" value="/"/>
                            <input type="button" value="登录" id="submit" class="btn btn-primary" @click="logincheck(false)" placeholder="登录" disabled="" />
                            <!--<button type="submit" class="btn btn-primary" id="login" @click="logincheck()">登录</button>-->
                        </div>
                    </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-primary"  data-dismiss="modal" aria-label="Close" @click="logincheck(true)">随便看看(匿名登录)</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    var self;
    export default {

        data () {
            self = this;
            return {
                noneUser:false,
                nonePwd:false,
                username:"",
                password:""
            }
        },

        methods: {
            logincheck:function(mode){
                var url = "http://"+window.location.hostname+":3123/users/login";
                $.ajax({
                    type: "post",
                    async: true,
                    data:{
                        nickname:username.value.toString(),
                        pwd:password.value.toString(),
                        subflag:"1",
                        targeturl:"/",
                        anonymous:mode
                    },
                    xhrFields:{withCredentials:true},
                    url: url,
                    dataType: "json",
                    success: function(json){

                        if(json.loginSuccess){

                            alert("登录成功");
                            window.location.href = "http://"+window.location.hostname+":3123";
                        }else{
                            alert("用户名或密码错误");
                        }
                    },
                    error: function(){
                        console.log('logincheck ajax send failed!');
                    }
                });
            },
            onchange:function(){

                var $submit = $("#submit")
                var uname = username.value.toString();
                var pwd = password.value.toString();
                if(uname==""){
                    this.noneUser = true;
                    $submit.attr("disabled","disabled")
                }else{
                    this.noneUser = false;
                }
                if(pwd==""){
                    this.nonePwd = true;
                    $submit.attr("disabled","disabled")
                }else{
                    this.nonePwd = false;
                }

                if(!this.noneUser && !this.nonePwd){
                    $submit.removeAttr("disabled")
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #loginpad{
    }
    .modal{
        position: fixed;
        top: 100px;
    }
    .modal-dialog {
        width: 340px;
        margin: 0 auto;
    }
    .modal-body{
        height: 220px;
    }
    .login{
        width: 100%;
        height: 90%;
        margin: 0 auto;
    }
    .login .btn-primary{

        width: 40%;
        margin: 15px auto 0;
    }
    .login input{
        width: 60%;
        margin-left: 20%;
        margin-top: 10px;
    }
    .warn{
        display: block;
        margin-top: 10px;
    }
    @media only screen and (max-width: 768px){
        .modal-dialog {
            width: 340px;
            margin: 0 auto;
        }
    }


</style>
