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
           <div class="flex alcenter logos_wrap">
           <img class="logos" src="../assets/images/cooper01.png" />
            <img class="logos" src="../assets/images/cooper02.png" />
             <img class="logos" src="../assets/images/cooper03.png" />
              <img class="logos" src="../assets/images/cooper04.png" />
               <img class="logos" src="../assets/images/cooper05.png" />
                <img class="logos" src="../assets/images/cooper06.png" />
                </div>
        </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.foot{
  img:last-child{
    //   width: 100%;
  }
}
.logos_wrap{
    width: 100%;
   justify-content: center;
}
.logos:last-child{
    margin-right: 0;
}
.logos{
    margin-right: 80px;
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
