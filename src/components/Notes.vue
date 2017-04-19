<template>
    <div id="page5">

        <rightslide></rightslide>

        <router-view></router-view>

    </div>
</template>

<script>
    export default {
        data ()
        {
            return {

            }
        },
        mounted()
        {

        },
        methods:{

        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #page5 {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #85AD92;
    }
    #page5 p {
        font-size: 20px;
    }
    .notes {
        position: absolute;
        top: 60px;
        left: 10%;
        width: 60%;
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
    .nlist{
        margin-bottom: 20px;
        border-radius: 10px;
        background-color: #fff;
    }
    .nlist span{
        font-size: 16px;
    }


</style>
