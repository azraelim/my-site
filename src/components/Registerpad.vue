<template>
    <div class="modal" id="registerpad" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">注册</h4>
                </div>
                    <div class="modal-body">
                        <div class="register">

                                <input type="text" name="nickname" class="form-control reginput" placeholder="昵称">
                                <span class="hint">必填，长度为4-16个字符</span>
                                <span class="error">名称格式错误</span>
                                <span class="correct">名称可用</span>

                                <input type="password" name="pwd" class="form-control reginput" placeholder="密码">
                                <span class="hint">必填，长度为4-16位</span>
                                <span class="error">密码格式错误</span>
                                <span class="correct">密码可用</span>

                                <input type="password" name="repwd" class="form-control reginput" placeholder="重复密码">
                                <span class="hint">请重复密码</span>
                                <span class="error">两次输入不一致</span>
                                <span class="correct">输入正确</span>

                                <input type="text" name="email" class="form-control reginput" placeholder="邮箱">
                                <span class="hint">以后大概可以找回密码</span>
                                <span class="error">请输入正确的邮箱地址</span>
                                <span class="correct">输入正确</span>

                                <input type="hidden" name="subflag" value="1"/>
                                <input type="hidden" name="targeturl" value="/"/>
                                <input type="submit" value="注册" class="btn btn-primary" placeholder="注册" @click="regcheck()"/>
                        </div>
                    </div>

                    <!--<div class="modal-footer">
                        <button type="button" class="btn btn-primary"  data-dismiss="modal" aria-label="Close">随便看看(匿名登录)</button>
                    </div>-->
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        data () {
        return {

        }
        },
        mounted(){

            this.inputcheck();
        },
        methods:{
            regcheck:function(){
                var url = "http://"+window.location.hostname+":3123/users/register";
                var inputs = $(".reginput");
                $.ajax({
                    type: "post",
                    async: false,
                    data:{
                        nickname:inputs[0].value.toString(),
                        pwd:inputs[1].value.toString(),
                        repwd:inputs[2].value.toString(),
                        email:inputs[3].value.toString(),
                        subflag:"1",
                        targeturl:"/",
                    },
                    xhrFields:{withCredentials:true},
                    url: url,
                    dataType: "json",
                    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                    success: function(json){

                        switch (json.regstatus) {
                            case 0:
                                alert('数据库未能处理请求！');
                                break;
                            case 1:
                                alert('注册成功！');
                                window.location.href = document.referrer;
                                break;
                            case 2:
                                alert('email重复！');
                                break;
                            case 3:
                                alert('昵称重复！');
                                break;
                            case 4:
                                alert('数据库异常，请稍后再试！');
                                break;
                        }
                    },
                    error: function(){
                        console.log(' register ajax send failed!');
                    }
                });
            },
            inputcheck:function(){
                var inputs = $(".reginput");
                var hints = $(".hint");
                var errors = $(".error");
                var corrects = $(".correct");
                //设定匹配规则
                var rules = [];
                rules[0] = /\S{4,16}/;
                rules[1] = /\S{4,16}/;
                var tempPW = inputs[1].value.toString();
                rules[2] = new RegExp("^"+tempPW+"$");
                rules[3] = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;
                //rules[4] = /^1[3578][0-9]{9}$/ ;

                function pwRecheck(){
                    tempPW = inputs[1].value.toString();
                    rules[2] = new RegExp("^"+tempPW+"$");
                }

                var temp = [];
                for(var i=0;i<hints.length;i++){
                    temp[i] = (function(k){
                        return function(){
                            inputs[k].onfocus = function(){
                                //console.log(inputs[k])
                                if(inputs[k].value == ""){
                                    hints[k].style.display = "block";
                                    corrects[k].style.display = "none";
                                    errors[k].style.display = "none";
                                }
                            };
                            inputs[k].onblur = function(){
                                pwRecheck();
                                if(inputs[k].value == ""){
                                    hints[k].style.display = "block";
                                    errors[k].style.display = "none";
                                    corrects[k].style.display = "none";
                                }else{
                                    if(rules[k].test(inputs[k].value.toString())){
                                        hints[k].style.display = "none";
                                        errors[k].style.display = "none";
                                        corrects[k].style.display = "block";
                                    }else{
                                        hints[k].style.display = "none";
                                        errors[k].style.display = "block";
                                        corrects[k].style.display = "none";
                                    }
                                }
                            }
                        }
                    })(i);
                }
                for (var k=0;k<temp.length;k++) {
                    temp[k]();
                }
            }
        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal{
        position: fixed;
        top: 100px;
    }
    .modal-body{
        height: 280px;
    }
    .modal-body span{
        font-size: 20px;
    }
    .register{
        width: 100%;
    }
    .register span{
        display: inline-block;
        width: 150px;
        height: 30px;
        float: right;
        position: relative;
        top: -25px;
        right: 20px;
        text-align: left;
        font-size: 12px;
        color: #666;
    }
    .register input{
        width: 50%;
        margin-left: 10%;
        margin-top: 15px;
    }
    .register .btn{
        width: 120px;
        margin: 20px auto;
    }
    .register button{
        width: 120px;
        margin: 20px auto;
    }
    span.hint{

    }
    span.error{
        display: none;
        color: red;
    }
    span.correct{
        display: none;
        color: green;
    }
    @media (min-width: 768px){
        .modal-dialog {
            width: 500px;
        }
    }
    @media (max-width: 440px){
        .register input{
            width: 55%;
            margin-left: 5%;
            margin-top: 15px;
        }
        .register span{
            width: 100px;
            height: 30px;
            float: right;
            position: relative;
            top: -25px;
            right: 0;
            text-align: left;
            font-size: 12px;

        }
    }
</style>
