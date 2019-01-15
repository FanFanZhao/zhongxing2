<template>
  <div id="index-head" class="flex">
    <div class="header-l flex">
      <div class="logo flex alcenter mr20" @click="goHome">
        <img src="../assets/images/new_logo02.png" alt>
      </div>
      <!-- <span class="mr60 titles" @click="goHome">一带一路</span> -->
      <router-link to="/" exact>{{$t('header.home')}}</router-link>
      <router-link to="/legalTrade" v-if="token">{{$t('header.c2c')}}</router-link>
      <div v-else @click="goLogin()">{{$t('header.c2c')}}</div>
      <router-link v-if="token" to="/c2c">{{$t('header.c2cTransfer')}}</router-link>
      <div v-else @click="goLogin()">{{$t('header.c2cTransfer')}}</div>
      <router-link to="/dealCenter">{{$t('header.currency')}}</router-link>
      <router-link to="/myLegalShops" v-if="isShow">{{$t('header.shop')}}</router-link>
      <router-link to="/new_account" v-if="token">{{$t('header.assets')}}</router-link>
      <div v-else @click="goLogin()">{{$t('header.assets')}}</div>
      
       <!-- <router-link to="/helpcenter">{{$t('header.help')}}</router-link>
      <router-link v-if="token" to="/advice">{{$t('header.complaint')}}</router-link>
      <div v-else @click="goLogin()">{{$t('header.complaint')}}</div> -->
      <div @click="candy">{{$t('header.candy')}}</div>
       <div @click="candy">{{$t('header.coin')}}</div>
        <div @click="candy">{{$t('header.show')}}</div>
      <!-- <router-link to="/components/noticeList">公告</router-link>
      <div class="coin-box">
        <router-link to="/currencyApply">上币申请</router-link>
        <router-link to="/currencyList" >币种列表</router-link>
      </div>-->
      <!-- <div>
        <div class="download">
          <div>app下载</div>
          <img src="../assets/images/ewm.png" alt="">
        </div>
      </div>-->
    </div>
    <div class="header-r flex">
      
      <div v-if="!account_number.length" class="flex">
        <router-link to="/components/login">{{$t('header.in')}}</router-link>
        <router-link to="/components/register">{{$t('header.up')}}</router-link>
      </div>
      <div v-if="account_number.length" class="flex">
        <!-- <div class="assets">
          <div>资产</div>
          <div class="links">
            <router-link to='/finance'>交易</router-link>
           
          </div>
        </div>-->
        <div class="order">
          <span>{{$t('header.orders')}}</span>
          <ul class="order_list blue_bg">
            <li class="now" @click="now">{{$t('header.current')}}</li>
            <li class="history" @click="history">{{$t('header.his')}}</li>
          </ul>
        </div>
        <div class="links-box">
          <div class="account_number">{{account_number}} ({{$t('header.code')}} {{extension_code}})</div>
          <div class="links blue_bg">
            <router-link to="/userCenter">{{$t('header.center')}}</router-link>
            <router-link to="/userSetting" v-if="token">{{$t('header.setting')}}</router-link>
            <div v-else @click="goLogin()">{{$t('header.setting')}}</div>
            <div @click="signOut">{{$t('header.out')}}</div>
          </div>
        </div>
        
      </div>
      <div class="flex notice" @mouseover="showNot = true" @mouseleave="showNot = false">
        <img src="../assets/images/not.png" @mouseover="getNotice();" alt="">
        <p :class="['scroll',{showNot:showNot}]">
          <span @click="$router.push({path:'/components/noticeDetail',query:{id:item.id}})" v-for="(item,index) in noticeList" :key="index">{{item.title}}</span>
        </p>
      </div>
      <div class="flex lang-box">
          <span @click="setLang('zh')">中</span>
          <span @click="setLang('en')">En</span>
        </div>
      <!-- <div class=" theme flex">
          <img src="../assets/images/dark.png"  @click="$changeTheme('light')" alt="">
          <img src="../assets/images/light.png" @click="$changeTheme('dark')" alt="">
          
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account_number: "",
      extension_code: "",
      token: "",
      isShow: false,
      noticeList:[],
      showNot:false
    };
  },
  created() {
    this.getNotice()
    this.token = window.localStorage.getItem("token") || "";
    this.account_number = window.localStorage.getItem("accountNum") || "";
    this.extension_code = window.localStorage.getItem("extension_code") || "";
    eventBus.$on("toHeader", msg => {
      if (msg.account) {
        this.account_number = msg.account;
        this.extension_code = msg.extension_code;
      }
    });
    if (this.token) {
      this.init();
    }
  },
  mounted() {
    eventBus.$on("toHeader", msg => {
      console.log(msg);
      if (msg.account) {
        this.extension_code = msg.extension_code;

        this.account_number = msg.account;
      }
    });
  },
  methods: {
    candy(){ 
       layer.msg(this.$t('lay.notopen'))   
    },
    getNotice(){
      this.$http({
        url:  '/api/news/list',
        method:'post',
        data:{language:this.$i18n.locale == 'zh'?1:2,c_id:21}
      }).then(res => {
        this.noticeList = res.data.message.list;
      })
    },
    setLang(lang) {
      var l = window.localStorage.getItem("locale") || "zh";
      if (l == lang) {
        return;
      } else {
        window.localStorage.setItem('locale',lang);
        this.$i18n.locale = lang;
        window.location.reload();
      }
    },
    goHome() {
      this.$router.push("/");
    },
    now() {
      this.$router.push("/entrust");
    },
    history() {
      this.$router.push("/hisentrust");
    },
    signOut() {
      this.account_number = "";
      // window.localStorage.removeItem("token");
      // window.localStorage.removeItem("accountNum");
      // window.localStorage.removeItem("user_id");
      // window.localStorage.removeItem("extension_code");
      window.localStorage.clear();
      this.$router.push("/components/login");
    },
    goLogin() {
      this.$router.push("/components/login");
    },
    init() {
      this.$http({
        url: "/api/user/info",
        method: "GET",
        data: {},
        headers: { Authorization: this.token }
      }).then(res => {
        console.log(res);
        if (res.data.type == "ok") {
          window.localStorage.setItem("status", res.data.message.review_status);
          if (res.data.message.is_seller == "1") {
            this.isShow = true;
          }
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.notice{
  position: relative;
  margin: 0 10px 0 20px;
  padding: 12.5px 10px;
  height: 45px;
  cursor: pointer;
  img{
    width: 20px;
    height: 20px;
  }
  >.showNot{
    padding-top: 10px;
    height: 200px;
    transition: all .3s;
    overflow: scroll;
  }
  >p{
    position: absolute;
    
    width: 220px;
    border-radius: 4px;
    box-shadow: 0 2px 3px #ccc;
    top: 45px;
    left: -100px;
    background: #fff;
    z-index: 999;
    height: 200px;
    overflow: auto;
    transition: all .3s;
    height: 0;
    overflow: hidden;
    span{
      margin: 0 10px;
      display: block;
      font-size: 12px;
      line-height: 32px;
      color: #333;
      border-bottom: 1px dashed #eee;
      &:hover{
        color: #d45858;
      }
    }
  }
}
.lang-box{
  margin-left: 10px;
  span{
    margin-left: 20px;
    cursor: pointer;
  }
}
.titles {
  cursor: pointer;
}
.order {
  margin-right: 15px;
  position: relative;
  cursor: pointer;
  padding-right: 20px;
  background: url("../assets/images/arrow0.png") no-repeat right center;
}
.order_list {
  min-width: 80px;
  left: -10px;
  position: absolute;
  background: #2e1b85;
  color: #fff;
  padding: 0 10px;
  z-index: 999999;
}
.order_list {
  display: none;
}
.order:hover ul {
  display: block;
}
.order_list li {
  line-height: 30px;
}
.order_list li:hover {
  color: #d45858;
}
#index-head {
  justify-content: space-between;
  padding: 0 20px;
  min-width: 1200px;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  background: #113344;
  color: #ccc;

  a:hover,
  .router-link-active {
    color: #d45858;
  }
  .currency-list,
  .lalala {
    display: none;
  }
  > .header-l {
    align-items: center;
    > .logo {
      // border-radius: 50%;
      width: 100px;
      // height: 30px;
      // background: #fff;
      > img {
        width: 100%;
      }
    }
    > a,
    > div {
      margin-right: 20px;
      height: 45px;
      cursor: pointer;

      > a {
        display: block;
      }
    }
    > div:hover {
      color: #d45858;
    }
    > .coin-box {
      position: relative;
      a:last-child {
        display: none;
        position: absolute;
        width: 130%;
        text-align: center;
        left: -15%;
      }
      &:hover {
        a:last-child {
          display: block;
          background: #181b2a;
          // text-align: center;
        }
      }
    }
    .download {
      position: relative;
      img {
        position: absolute;
        display: none;
        width: 100px;
        height: 100px;
        z-index: 999;
        left: -20px;
      }
      &:hover {
        img {
          display: block;
        }
      }
    }
  }
  .header-r {
    a {
      margin: 0 20px;
    }
    .assets {
      position: relative;
      margin-right: 25px;
      padding-left: 25px;
      background: url("../assets/images/assets.png") no-repeat left center;
      background-size: 20px 20px;
      cursor: pointer;
      > div:first-child {
        padding-right: 14px;
        background: url("../assets/images/arrow0.png") no-repeat right center;
      }
      > .links {
        position: absolute;
        right: 0;
        width: 80px;
        z-index: 999;
        text-align: center;
        background: #181b2a;
        display: none;
        a {
          margin: 0;
          display: block;
        }
      }
      &:hover {
        .links {
          display: block;
        }
      }
    }
    .links-box {
      position: relative;
      cursor: pointer;
      padding-right: 20px;
      background: url("../assets/images/arrow0.png") no-repeat right center;

      &:hover {
        .links {
          display: block;
        }
      }
      .account_number {
        padding-left: 20px;
        background: url("../assets/images/icon_mine.png") no-repeat left center;
        background-size: 15px;
      }
      .links {
        position: absolute;
        right: 0;
        z-index: 999;
        background: #181b2a;
        display: none;
        a {
          border-bottom: 1px solid #383d54;
        }
        a,
        div {
          display: block;
          padding: 0 14px;
          margin: 0;
          text-align: center;
          &:hover {
            color: #d45858;
          }
        }
      }
    }
    .theme > img {
      cursor: pointer;
      margin-left: 15px;
      margin-top: 12.5px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
