<template>
<div class="login bg-main clr-part">
    <indexHeader></indexHeader>
    <div class="contentBK">
        <div class="content-wrap">
            <div class="account">
                <div class="main">
                    <p class="main_title">{{$t('login.welcome')}}</p>
                    <!-- <div class="tab flex" @click="account_number=''">
                      <span @click="isMb = true" :class="{now:isMb}">{{$t('login.phone')}}</span>
                      <span @click="isMb = false" :class="{now:!isMb}">{{$t('login.email')}}</span>
                    </div> -->
                    <div class="register-input">
                        <span class="register-item">{{$t('accounts')}}</span>
                         <select name="" v-if="isMb" class="chooseTel scroll" v-model="areaCode" ref="select">
                        <option :value="index" v-for="(item,index) in country" :key="index">{{item.area_code}} {{item.name_cn}}</option>
                      </select>
                       <input type="text" class="input-main input-content phone" maxlength="20" v-model="account_number" id="account" :style='{width:isMb?"auto":"520px !important"}'>
                    </div>
                     <div class="register-input pass-box">
                        <span class="register-item">{{$t('pwd')}}</span>
                        <input :type="showpass?'text':'password'" class="input-main input-content" maxlength="16" v-model="password" id="pwd">
                        <img src="../assets/images/showpass.png" alt="" v-if="showpass" @click="showpass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showpass" @click="showpass = true">
                    </div>
                    <!--验证码-->
                   
                    <div class="register-input bdr-part">
                        <span class="register-item">{{$t('code')}}</span>
                        <div class="flex">
                    <input type="text" v-model="code" class="codes" id="code">
                    <button type='button' class="code-btn redBg curPer" @click="sendCode">{{$t('code')}}</button>
                    </div>
                </div>
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button class="register-button curPer redBg " @click="login">{{$t('header.in')}}</button>
                        <div class="have-account">
                            <router-link tag="span" class="redColor" to="/forgetPwd" style="cursor:pointer">{{$t('login.forget')}}</router-link>
                        </div>
                    </div>
                    <div class="right-tip ">
                        <p>{{$t('login.dont')}}</p>
                        <p>{{$t('login.invite')}}</p>
                        <router-link :to="{ name: 'register'}">
                            <p class="redColor mt20">{{$t('header.up')}}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <indexFooter></indexFooter> -->
</div>

</template>

<script>
import indexHeader from "@/view/indexHeader";
import indexFooter from "@/view/indexFooter";
import country from '../lib/country.js'
export default {
  name: "login",
  components: { indexHeader, indexFooter },
  data() {
    return {
      account_number: "",
      password: "",
      code:'',
      areaCode:0,
      country:country,
      isMb: true,                  //是否为手机注册
      account: "",                //用户名
      showpass:false
    };
  },
  beforeRouteEnter(to,from,next){
    if(from.path == '/dealCenter'){
      window.location.reload();
    }
    next()
  },
  created() {
    console.log(this.$utils);

    this.account_number = this.$route.query.account_number || "";
  },
  methods: {
    userInfo(){
      this.$http({
          url: '/api/'+'user/info',
          method:'get',
          data:{},  
          headers: {'Authorization':  localStorage.getItem('token')},    
      }).then(res=>{
          // console.log(res);
          if(res.data.type == 'ok'){
          console.log(res)
          localStorage.setItem('user_id',res.data.message.id)
          localStorage.setItem('extension_code',res.data.message.extension_code);
          }
      }).catch(error=>{
          
      })                       
    },
    //发送验证码
    sendCode(e){
      var that = this;
      console.log(this.country[this.areaCode].area_code)
      var url;
      var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      var i = layer.load();
       let account_number = this.$utils.trim(this.account_number);
      if(emreg.test(account_number)){
          url = 'sms_mail'
      }else{
         url = 'sms_send'
      }
    this.$http({
        url: '/api/' + url,
        method: "post",
        data: {
          user_string: account_number,
          front:country[this.areaCode].area_code,
          type:'login'
        }
      }).then(res=>{
        console.log(res)
        layer.close(i);
         layer.msg(res.data.message);
         if(res.data.type == 'ok'){
           //验证码倒计时
           var time = 60;
      var timer = null;
      timer = setInterval(function() {
        e.target.innerHTML = time + "s";
        e.target.disabled = true;
        if (time == 0) {
          e.target.innerHTML = that.$t('code');
          e.target.disabled = false;
          clearInterval(timer);
          return;
        }
        time--;
      }, 1000);
         }
      })
    },
    login() {
      
      let account_number = this.$utils.trim(this.account_number);
      let password = this.$utils.trim(this.password);
      if (this.account_number.length == "") {
        layer.tips(this.$t('lay.paccount'), "#account");
        return;
      }
      if (this.password.length < 6) {
        layer.tips(this.$t('lay.pwdliu'), "#pwd");
        return;
      }
      if (this.code == '') {
        layer.tips(this.$t('lay.notcode'), "#code");
        return;
      }
      var i = layer.load();
      this.$http({
        url: '/api/' + "user/pc_login",
        method: "post",
        data: {
          user_string: account_number,
          password: password,
          code:this.code,
          type: 1
        }
      })
        .then(res => {
          console.log(res);
           layer.close(i);
          res = res.data;
          if (res.type === "ok") {
            layer.msg(this.$t('lay.slogin'));
            localStorage.setItem("token", res.message);
            localStorage.setItem("accountNum", account_number);
            this.$store.commit("setAccountNum");
            this.userInfo();
            setTimeout(() => {
               this.$router.push("/");
            }, 1000);
           
          } else {
            layer.msg(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.tab{
  margin-top: 20px;
  width: 230px;
}
.tab span{
  padding-bottom: 5px;
  margin-right: 40px;
  cursor: pointer;
}
.tab .now{
  color: #d45858;
  font-weight: 600;
  border-bottom: 2px solid #d45858;
}
.chooseTel{
    height: 46px;
    width: 160px;
    border-color: #ccc;
    padding: 0 10px;
    font-size: 14px;
}
.phone{
  width: 360px!important;
  border-left: none;
}
.code-btn{
  cursor: pointer;
}
.codes{
  width: 430px;
  padding: 0 20px;
  min-height: 46px;
  border:1px solid #ccc;
}
.code-btn{
  width: 90px;
  min-height: 46px;
}
.login{
  min-height: 1050px;
}
/* .content-wrap{background: #fff center bottom 316px repeat-x,-webkit-linear-gradient(top,#21263f,#262a42);} */
.account {
  width: 1200px;
  margin: 0 auto;
  padding-top: 93px;
  overflow: hidden;
  min-height: 880px;
}
.main {
  position: relative;
  padding: 0 0 60px 30px;
}
.main_title {
  font-size: 36px;
}
.register-item {
  display: block;
  height: 22px;
  font-size: 12px;
}
.register-input {
  position: relative;
  margin-top: 20px;
}
.input-box {
  position: relative;
  margin-top: 40px;
}
.input-main {
  width: 520px;
  min-height: 46px;
  border: 1px solid #ccc;
  padding: 0 20px;
  font-size: 14px;
  border-radius: 3px;
}
.icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  border-right: 1px solid #52688c;
  position: absolute;
  top: 0;
}
.login-btn {
  width: 420px;
  margin-top: 40px;
  font-size: 16px;
  border-radius: 4px;
  color: #fff;
  line-height: 48px;
  cursor: pointer;
}
.noaccount {
  color: #fff;
}
.register-button {
  width: 200px;
  display: inline-block;
  line-height: 46px;
  border-radius: 4px;
  color: #fff;
  border: none;
}
.have-account {
  font-size: 14px;
  display: inline-block;
  margin-left: 30px;
}
.right-tip {
  position: absolute;
  left: 620px;
  top: 70px;
  line-height: 24px;
  padding-right: 50px;
  margin-top: 10px;
  font-size: 14px;
}
</style>
