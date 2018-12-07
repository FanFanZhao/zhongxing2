<template>
    <!-- <div id="footer">
        <div>
            <span>联系我们</span>
            <span>费率标准</span>
            <span>API文档</span>
            <span>用户协议</span>
            <span>本站公告</span>
        </div>
        <p class="">© 2013-2018 环球数贸信息平台</p>
    </div> -->
    <div class="foot flex column alcenter  blue_bg" style="padding:50px 80px;">
           <h1 class="ft18 mb50">{{$t('home.cooper')}}</h1>
           <!-- <p class="ft12 mb30">我/们/在/去/中/心/化/的/路/上</p> -->
           <img class="logos" src="../assets/images/footer_bg.png" />
           <!-- <img src="../assets/images/footer.jpg" /> -->
        </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.foot{
//   padding: 50px 0;
  img:last-child{
      width: 100%;
  }
}
.logos{
    margin-bottom: 30px;
}
// #footer{
   
//     background: #09162e;
//     color:#aabdbc;
//     font-size: 14px;
//     text-align: center;
//     >div{
//         padding: 20px;
//         span{
//             margin-right: 30px;cursor: pointer;
//             &:hover{color:#d45858}
//         }
//     }
//     p{
//         padding: 10px;
//     }
// }
</style>
