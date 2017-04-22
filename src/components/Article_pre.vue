<template>
    <div class="notewrap">
        <div class="title">
            <span>
                <router-link :to="{ path:'/notes/detail',query:{noteid:item.noteid}}">
                    {{item.title}}
                </router-link>
            </span>
        </div>
        <div class="content">
                <span>
                    {{item.content}}
                </span>
        </div>
        <div class="info">
            <span>查看：{{item.looknum}}</span>
            <span>回复：{{item.renum}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:['item'],
        data ()
        {
            return {
            }
        },
        mounted(){

        },
        methods:{

        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .notewrap{
        margin-bottom: 30px;
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
        height: 68px;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
    }
    .content span{
        display: inline-block;
        margin-left: 20px;
        margin-right: 20px;
    }
    .info{
        position: relative;
        text-align: left;
    }
    .info span:first-child{
        margin-left: 10px;
    }
    .info span{
        margin-left: 50px;
        font-size: 13px;
        color: #008BA7;
    }
</style>
