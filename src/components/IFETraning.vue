<template>
    <div id="ife">

        <div class="textwrap">
            <div class="linkwrap">
                <a href="http://www.backofsun.xyz/training/clock.html">canvas时钟</a>
            </div>
            <p>一个略显花哨的canvas时钟特效</p>
            <p>其中一个bug未解决：考虑到性能，小球弹出可视区域后就就被执行销毁操作。
                在chrome浏览器下，如果将该页面最小化，则chrome会将计时器暂停，小球停止移动，
                然而内部的时间计算仍在进行，每隔一秒仍然会渲染小球，
                导致小球只增不减，在返回该页面时突然冒出一大堆小球。
            </p>
        </div>


        <div class="textwrap">
            <p>
                这里是在<a href="http://ife.baidu.com/2016/task/all">百度前端技术学院2016</a>进行的一些练习，
                这个系列的练习都很有意思，难度由易到难，从开始的零基础HTML编码到最后实现一个小型的网站或者应用，
                初学的时候我挑了其中几个做了做，现在再回顾当时的代码有点惨不忍睹，想想还是放上来吧。
            </p>

            <div class="linkwrap">
                <a href="http://www.backofsun.xyz/training/task026.html">task026-行星与飞船</a>
            </div>
            <p>行星与飞船</p>
            <ul>
                <li>动力系统，可以完成飞行和停止飞行两个行为，暂定所有飞船的动力系统飞行速度是一致的，比如每秒20px，飞行过程中会按照一定速率消耗能源（比如每秒减5%）</li>
                <li>每个飞船的能源是有限的，用一个属性来表示能源剩余量，这是一个百分比，表示还剩余多少能源。能源耗尽时，飞船会自动停止飞行</li>
                <li>飞船有两个状态：飞行中和停止，飞船的行为会改变这个属性状态</li>
                <li>飞船的自我销毁方法会立即销毁飞船自身</li>
                <li>创建一个新的飞船进入轨道，最多可以创建4个飞船，刚被创建的飞船会停留在某一个轨道上静止不动</li>
                <li>命令某个飞船开始飞行，飞行后飞船会围绕行星做环绕运动，需要模拟出这个动画效果</li>
                <li>命令某个飞船停止飞行</li>
                <li>命令某个飞船销毁，销毁后飞船消失、飞船标示可以用于下次新创建的飞船</li>
            </ul>

            <div class="linkwrap">
                <a href="http://www.backofsun.xyz/training/task035.html">task033-035-听指令的小方块</a>
            </div>
            <p>听指令的小方块</p>
            <p>这个我用canvas反而做的很麻烦，应该直接上css3，代码会简单很多</p>

            <ul>
                <li>实现一个类似棋盘的格子空间，每个格子用两个数字可以定位，一个红正方形的DOM在这个空间内，正方形中的蓝色边表示这是他的正面，可以允许输入多条指令，每一行一条</li>
                <li>在输入框中允许输入如下指令，按下按钮后，使得正方形做相应动作</li>
                <li>
                    操作指令：
                    <ul>
                        <li>GO：向蓝色边所面向的方向前进一格（一格等同于正方形的边长）</li>
                        <li>TUN LEF：向左转（逆时针旋转90度）</li>
                        <li>TUN RIG：向右转（顺时针旋转90度）</li>
                        <li>TUN BAC：向右转（旋转180度）</li>
                        <li>TRA LEF：向屏幕的左侧移动一格，方向不变</li>
                        <li>TRA TOP：向屏幕的上面移动一格，方向不变</li>
                        <li>TRA RIG：向屏幕的右侧移动一格，方向不变</li>
                        <li>TRA BOT：向屏幕的下面移动一格，方向不变</li>
                        <li>MOV LEF：方向转向屏幕左侧，并向屏幕的左侧移动一格</li>
                        <li>MOV TOP：方向转向屏幕上面，向屏幕的上面移动一格</li>
                        <li>MOV RIG：方向转向屏幕右侧，向屏幕的右侧移动一格</li>
                        <li>MOV BOT：方向转向屏幕下面，向屏幕的下面移动一格</li>
                        <li>对于GO，TRA以及MOV指令增加可以移动格子数量的参数，例如 MOV RIG 4</li>
                    </ul>
                </li>
                <li>点击执行时，依次逐条执行所有命令</li>
            </ul>

            <div class="linkwrap">
                <a href="http://www.backofsun.xyz/training/task039.html">task037-039-冻结行列表格</a>
            </div>
            <p>冻结行列表格</p>
            <ul>
                <li>实现一个支持首行冻结的表格组件</li>
                <li>当页面向下滚动，使得第一行已经在屏幕外时，则第一行则变成始终固定在屏幕最上方</li>
                <li>当整个表格都滚动出屏幕时，固定的第一行也消失</li>
                <li>支持排序功能</li>
            </ul>
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
    #ife{
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
        #ife{
            position: absolute;
            top: 80px;
            left: 5%;
            width: 90%;
        }
    }
</style>
