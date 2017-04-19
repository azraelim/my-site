<template>
    <div id="imitate">
        <div class="textwrap">
            <div class="linkwrap">
                <a href="http://www.backofsun.xyz/no1/index.html">1号店(桌面版)</a>
            </div>
            <p>1号店首页的仿制品</p>
            <p>在ie9+ chrome Firefox浏览器下测试通过</p>
            <p>使用了jQuery2.1.4，jquery.lazyload插件，图片源来自原网站</p>
            <p>实现了原网站首页的全部特效</p>
            <p>对屏幕宽度768~1200px和1200px+两类设备进行了响应式设计</p>
        </div>
        <div class="textwrap">
            <div class="linkwrap">
                <a href="http://www.backofsun.xyz/m_yhd/m_yhd.html">手机1号店</a>
            </div>
            <p>手机1号店首页的仿制品</p>
            <p>在UC手机浏览器(v11.4)，QQ手机浏览器(v7.2.1)，360手机浏览器(v8.1.0)下测试通过</p>
            <p>使用了jQuery2.1.4，Swipe插件，图片源来自原网站</p>
            <p>实现了原网站首页的全部特效</p>
            <p>自适应屏幕宽度为320~650px的设备</p>
        </div>

    </div>
</template>

<script>

    export default {

        data ()
    {
        return {}
    },
    mounted()
    {

    }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #imitate{
        position: absolute;
        top: 80px;
        left: 20%;
        width: 60%;
    }
    .textwrap{
        margin-top: 10px;
        margin-bottom: 20px;
        padding: 20px;
        text-align: left;
        background-color: #fff;
        border-radius: 8px;
    }
    .textwrap p{
        line-height: 30px;
    }
    .linkwrap a{
        display: inline-block;
        font-size: 18px;
        padding-left: 10px;
        margin: 10px;
    }
    @media only screen and   (max-width:768px) {
        #imitate{
            position: absolute;
            top: 80px;
            left: 5%;
            width: 90%;
        }
    }
</style>
