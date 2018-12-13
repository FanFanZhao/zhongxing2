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
    <div class="foot flex  blue_bg center" style="padding:50px 80px;">
           <!-- <h1 class="ft18 mb50">{{$t('home.cooper')}}</h1>
           <div class="flex alcenter logos_wrap">
           <img class="logos" src="../assets/images/cooper01.png" />
            <img class="logos" src="../assets/images/cooper02.png" />
             <img class="logos" src="../assets/images/cooper03.png" />
              <img class="logos" src="../assets/images/cooper04.png" />
               <img class="logos" src="../assets/images/cooper05.png" />
                <img class="logos" src="../assets/images/cooper06.png" />
                </div> -->
                <ul class="mr120 ft12 foot_ul">
                    <li class="mb15">{{$t('footer.tool')}}</li>
                    <li class="mb15">
                        <router-link v-if="token" :to="{path:'/legalTrade'}" class="mr15" tag="span">{{$t('header.c2c')}}</router-link>
                        <router-link v-else :to="{path:'/components/login'}" class="mr15" tag="span">{{$t('header.c2c')}}</router-link>
                        <router-link :to="{path:'/dealCenter'}" tag="span">{{$t('header.currency')}}</router-link>
                    </li>
                     <li class="mb15">
                        <router-link :to="{path:''}" tag="span"  class="mr15" >{{$t('header.candy')}}</router-link>
                        <router-link :to="{path:''}" tag="span">{{$t('footer.teach')}}</router-link>
                    </li>
                </ul>
                <ul class="mr120 ft12 foot_ul">
                    <li class="mb15">{{$t('footer.about')}}</li>
                    <li class="mb15">
                        <router-link :to="{path:'/components/noticeDetail',query:{id:46}}" class="mr15" tag="span">BANKEX</router-link>
                        <router-link :to="{path:''}" tag="span">{{$t('footer.download')}}</router-link>
                    </li>
                     <li class="mb15">
                        <router-link :to="{path:'/components/noticeDetail',query:{id:47}}" class="mr15" tag="span">{{$t('footer.connect')}}</router-link>
                        <router-link :to="{path:'/helpcenter'}" tag="span">{{$t('header.help')}}</router-link>
                    </li>
                    <li class="mb15">
                        <router-link :to="{path:'/webNotice'}" class="mr15" tag="span">{{$t('footer.gonggao')}}</router-link>
                        <router-link :to="{path:'/advice'}" tag="span">{{$t('header.complaint')}}</router-link>
                    </li>
                </ul>
                <ul class="ft12 foot_ul">
                    <li class="mb15">{{$t('footer.explain')}}</li>
                    <li class="mb15">
                        <router-link :to="{path:'/components/noticeDetail',query:{id:34}}" class="mr15" tag="span">{{$t('footer.xieyi')}}</router-link>
                    </li>
                    <li class="mb15">
                        <router-link :to="{path:'/components/noticeDetail',query:{id:44}}" tag="span">{{$t('footer.yinsi')}}</router-link>
                    </li>
                     <li class="mb15">
                        <router-link :to="{path:'/components/noticeDetail',query:{id:45}}" tag="span">{{$t('footer.feilv')}}</router-link>
                    </li>
                     
                </ul>
        </div>
</template>

<script>
export default {
    data(){
        return{
            token:''
        }
    },
   created(){
       this.token = window.localStorage.getItem('token') || '';
       console.log(this.token)
   }
}
</script>

<style lang='scss'>
.foot{
    align-items: flex-start;
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
.foot_ul li{
   cursor: pointer;
   color: #297ba4;
}
.foot_ul li span:hover{
   color: #d45858;
}
.foot_ul li:first-child{
   cursor:inherit;
   color: inherit;
}
.foot_ul li:first-child:hover{
   color: inherit;
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
