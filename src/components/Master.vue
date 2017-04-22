<template>
    <div id="master">
        <div class="warning">
            <p>您当前设备的屏幕分辨率过小 ，无法使用笔记编辑器</p>
        </div>


        <rightslide v-if="right"></rightslide>


        <div class="notes" v-if="typeid == 10">
            <iframe :src="url1" id="editor" scrolling="yes">您的浏览器不支持iframe！</iframe>
        </div>

        <div class="notes" v-if="typeid == 11">
            <iframe :src="url2" id="editor" scrolling="yes">您的浏览器不支持iframe！</iframe>
        </div>

    </div>
</template>

<script>
    import browser from '../js/getbrowser'

    export default {

        data ()
        {
            return {
                typeid:"",
                url1:"",
                url2:"",
                right:false
            }
        },
        mounted()
        {
            this.typeid = this.$route.params.typeid;
            this.url1 = "http://"+window.location.hostname+":3123/master";
            this.url2 = "http://"+window.location.hostname+":3123/writenote";

            if(browser.width>1400){
                this.right = true;
            }
        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #editor {
        width: 1000px;
        height: 1000px;
    }
    #master {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #85AD92;
    }

    #master p {
        font-size: 20px;
    }
    .notes {
        position: absolute;
        top: 70px;
        left: 6%;
        width: 1000px;
        height: 645px;
        background-color: #fff;
        overflow: hidden;
    }

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
    .warning{
        display: none;
    }
    @media only screen and   (max-width:1000px) {
        .warning{
            display: block;
            margin-top: 100px;
            width: 90%;
            margin-left: 5%;
        }
        .notes{
            display: none;
        }
    }
</style>
