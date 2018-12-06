<template>
<div id="reset-pwd">
    <div class="contentBK clr-part bg-main">
        <div class="content-wrap">
            <div class="account">
                <div class="main">
                    <p class="main_title">{{$t('lgpwd.setpwd')}}</p>
                    <div class="register-input pass-box">
                        <span class="register-item">{{$t('lpwd.oldpwd')}}</span>
                        <input :type="showold?'text':'password'" class="input-main input-content" maxlength="20" v-model="oldPwd" id="account">
                        <img src="../assets/images/showpass.png" alt="" v-if="showold" @click="showold = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showold" @click="showold = true">
                    </div>
                     <div class="register-input pass-box">
                        <span class="register-item">{{$t('lpwd.newpwd')}}</span>
                        <input :type="showpass?'text':'password'" class="input-main input-content" maxlength="16" v-model="pwd" id="pwd">
                        <img src="../assets/images/showpass.png" alt="" v-if="showpass" @click="showpass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showpass" @click="showpass = true">
                    </div>
                     <div class="register-input pass-box">
                        <span class="register-item">{{$t('lpwd.repwd')}}</span>
                        <input :type="showrepass?'text':'password'" class="input-main input-content" maxlength="16" v-model="rePwd" id="rePwd">
                        <img src="../assets/images/showpass.png" alt="" v-if="showrepass" @click="showrepass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showrepass" @click="showrepass = true">
                    </div>
                     <!-- <div class="register-input">
                        <span class="register-item">请输入验证码</span>
                        <div class="code-box bdr-part">
                            <input type="text" class="input-main input-content" maxlength="16" v-model="code">
                            <button type="button" class="redBg" @click="sendCode">{{resetSeconds}}</button>
                        </div>
                    </div> -->
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button type="button" class="register-button curPer redBg" @click="reset" >{{$t('lpwd.rpwd')}}</button>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <!-- <indexFooter></indexFooter> -->
</div>

</template>

<script>
export default {
  data() {
    return {
      oldPwd: "",
      pwd: "",
      rePwd: "",
      code: "",
      resetSeconds: this.$t('send'),
      showpass:false,
      showrepass:false,
      showold:false
    };
  },

  methods: {
    // sendCode() {
    //   if (this.resetSeconds != "发送验证码") {
    //     return;
    //   }
    //   let msg = "";
    //   let oldpassword = this.oldPwd;

    //   let password = this.pwd;
    //   let re_password = this.rePwd;

    //   if (oldpassword == "" || password == "" || re_password == "") {
    //     return;
    //   } else if (password != re_password) {
    //     layer.msg("两次输入的密码不一致");
    //     return;
    //   }
    //   this.$http({
    //     url: "/api/password_send",
    //     method: "post",
    //     data: { type: 1 },
    //     headers: { Authorization: localStorage.getItem("token") }
    //   }).then(res => {
    //     layer.msg(res.data.message);
    //     if (res.data.type == "ok") {
    //       let timer = null;
    //       let time = 31;
    //       var that = this;
    //       timer = setInterval(function() {
    //         time--;
    //         that.resetSeconds = "剩余" + time + "秒";
    //         if (time == 0) {
    //           that.resetSeconds = "发送验证码";
    //           clearInterval(timer);
    //         }
    //       }, 1000);
    //     }
    //   });
    // },
    reset() {
      var that = this;
      var regPsws = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
      let msg = "";
      let oldpassword = this.oldPwd;

      let password = this.pwd;
      let re_password = this.rePwd;
      let login_password_code = this.code;
      if (oldpassword == "") {
        layer.msg(that.$t('lpwd.oldpwd'))
        return;
      } else if(password == ''){
        layer.msg(that.$t('lpwd.newpwd'));
        return;
      } else if(password.length<6||password.length>16){
        layer.msg(that.$t('register.pwd'));
        return;
      }
      else if(!regPsws.test(password)){
        layer.msg(that.$t('register.pwd'));
        return;
      }
      else if(re_password == ''){
        layer.msg(that.$t('lgpwd.renewpwd'));
        return;
      }
      else if (password != re_password) {
        layer.msg(that.$t('lay.twopwd'));
        return;
      }
       else {
        this.$http({
          url: "/api/user/update_password",
          method: "post",
          data: {
            old_password: oldpassword,
            password: password,
            repassword: re_password
          },
          headers: { Authorization: localStorage.getItem("token") }
        }).then(res => {
          console.log(res);
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("accountNum");
            window.localStorage.removeItem("user_id");
            window.localStorage.removeItem("extension_code");
            this.$router.push("/components/login");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
#reset-pwd {
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
.code-box {
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 520px;
  background: #fff;
}
button{
  border-radius: 2px;
}
.code-box input {
  width: 406px;
  border: none;
}
.code-box button {
  padding: 0 20px;
  line-height: 47px;
  width: 107px;
}
</style>
