<template>
<div id="bind-email">
    <!-- <indexHeader></indexHeader> -->
    <div class="contentBK">
        <div class="content-wrap">
            <div class="account">
                <div class="main" >
                    <p class="main_title">绑定手机号</p>
                    <div class="register-input">
                        <span class="register-item">手机号</span>
                        <input type="text" class="input-main input-content" maxlength="20" v-model="account_number" id="account">
                    </div>
                     <div class="register-input code-input" >
                        <span class="register-item">验证码</span>
                        <div class="code-box">
                            <input type="text" class="input-main input-content" maxlength="16" v-model="phoneCode" id="pwd" >
                        <button type="button" @click="setTime" class="redBg">获取验证码</button>
                        </div>
                    </div>
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button class="register-button curPer redBg" type="button" @click="check">确认绑定</button>
                        
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
export default {
  components: { indexHeader, indexFooter },
  data() {
    return {
      account_number: "",
      phoneCode: "",
      showReset: false
    };
  },
  created() {},
  methods: {
    sendCode() {
      this.$http({
        url: "/api/sms_send",
        method: "post",
        data: {
          user_string: this.account_number
        }
      }).then(res => {
        console.log(res);
        layer.msg(res.data.message);
      });
    },
    setTime(e) {
      if (e.target.disabled) {
        return;
      } else {
        var reg = /^1[34578]\d{9}$/;
        if (this.account_number == "") {
          layer.tips("请输入手机号", "#account");
          return;
        } else if (!reg.test(this.account_number)) {
          layer.tips("您输入的手机号账号不符合规则!", "#account");
          return;
        }

        this.sendCode();
        var time = 60;
        var timer = null;
        timer = setInterval(function() {
          e.target.innerHTML = time + "秒";
          e.target.disabled = true;
          if (time == 0) {
            clearInterval(timer);
            e.target.innerHTML = "验证码";
            e.target.disabled = false;
            return;
          }
          time--;
        }, 1000);
      }
    },
    check() {
      let user_string = this.account_number;
      var data = {};
      if (user_string == "") {
        console.log("请输入账号");
        layer.tips("请输入手机号!", "#account");
        return;
      } else if (this.phoneCode == "") {
        layer.tips("请输入验证码!", "#pwd");
        return;
      } 
      console.log(data);
      data.code = this.phoneCode;
      data.mobile = user_string;
      this.$http({
        url: "/api/safe/mobile",
        method: "post",
        data: data,
        headers:{Authorization:window.localStorage.getItem('token')}
      }).then(res => {
        console.log(res);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.$router.go(-1)
        }
      });
    }
    
  }
};
</script>

<style scoped>
.content-wrap {
  
}
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
  padding: 0 20px;
  font-size: 14px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
.icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  position: absolute;
  top: 0;
}
.login-btn {
  width: 420px;
  margin-top: 40px;
  font-size: 16px;
  border-radius: 4px;
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
  width: 520px;
  /* border: 1px solid #ccc; */
}
.code-box .input-main {
  width: 419px;
  /* border: none; */
}
.code-box button {
  border: none;
  line-height: 47px;
  border-radius: 3px;
  width: 94px;
  cursor: pointer;
}
</style>
