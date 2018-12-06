<template>
  <div id="user-security">
    <div  class="clear mb50">
            <div  class="fl">
                <img  src="@/assets/images/account_security.png"/>
                </div>
            <div  class="fl ml30">
                <p  class="ft16 ">您的账号安全等级 :
                    <span  class="ml10">{{lever}}</span>
                </p>
                <div  class="bar-bottom">
                    <div  class="bar-top" :style="widthBar"></div>
                </div>
                <p  class="fColor2 ft14">
                    您的账号安全等级 {{lever}}，完善更多资料，保证账号安全</p>
                <p  class="fColor2 ft14" style="display: none;">
                    您的账号安全等级 低，恭喜您!</p>
            </div>
        </div>
        <ul >
            <li class="bdr-part"><img  src="@/assets/images/success.png" >
                <span  class="ml20">我的邀请码</span>
                <p  class="fl">
                    <span class="">{{extension_code}}</span>
                </p>
                <span  class="fr red ml25 mouseDefault"></span>
                <span  class="fr red mouseDefault" id="copy" @click="copy">复制邀请码</span>
            </li>
            <li class="bdr-part"><img  :src="psrc" >
                <span  class="ml20">绑定手机</span>
                <p  class="fl">
                    <span class="">{{account}}</span>
                </p>
                <span  class="fr red ml25 mouseDefault"></span>
                <span  class="fr red mouseDefault"></span>
                <router-link class="fr red" to="/components/bindPhone" v-if="account == '未绑定'">去绑定</router-link>
                <span class="fr" v-else>已绑定</span>
            </li>
            <li class="bdr-part">
                <img  :src="esrc">
                <span  class="ml20">绑定邮箱</span>
                <p  class="fl">
                  <span>{{email}}</span>
                </p>
                <span  class="fr red ml25 mouseDefault"></span>
                <span  class="fr red mouseDefault"></span>
                <router-link class="fr red" to="/components/bindEmail" v-if="email == '未绑定'">去绑定</router-link>
                <span class="fr" v-else>已绑定</span>
            </li>
            <!-- <li class="bdr-part"><img  src="@/assets/images/success.png">
                <span  class="ml20">登录密码</span>
                <p  class="fl">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p>
                <span  class="fr red ml25 mouseDefault"></span>
                <router-link to="/components/resetPwd" class="fr red">修改</router-link>
            </li> -->
            <li class="bdr-part"><img  src="@/assets/images/success.png">
                <span  class="ml20">法币资金密码</span>
                <p  class="fl">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p>
                <span  class="fr red ml25 mouseDefault"></span>
                <!-- <span  class="fr red mouseDefault"  @click="goPwd()">修改</span> -->
                <router-link to="/components/resetLegalPwd" class="fr red">{{isfPwd==0?'去设置':'修改'}}</router-link>
            </li>
            <li class="bdr-part"><img  :src="asrc">
                <span  class="ml20">身份认证</span>
                <p  class="fl">互联网账号存在被盗风险，进行身份认证以保护账户安全。</p>
                <span  class="fr red ml25 mouseDefault"></span>
                <router-link to="/components/authentication" class="fr red" v-if="authen==0">去认证</router-link>
                <router-link to="/components/authentication" class="fr red" v-if="authen==3">已拒绝(请重新认证)</router-link>
                <span class="fr red"  v-if="authen==2">已认证</span>   
                <span class="fr red"  v-if="authen==1">审核中</span>       
            </li>
            <li class="hide"><img  src="@/assets/images/icon_error.png">
                <span  class="ml20">提币密码</span>
                <p  class="fl">请设置提币专用密码，建议提现密码区别于登录密码。</p>
                <span  class="fr red ml25 mouseDefault"></span>
                <span  class="fr red mouseDefault"  @click="goTo(2)">设置</span>
            </li>
            <li class="hide"><img  src="@/assets/images/icon_error.png">
                <span  class="ml20">谷歌验证器</span>
                <p  class="fl">用于登录、提币、找回密码、修改安全设置时进行安全验证。</p>
                <span  class="fr red ml25 mouseDefault"></span>
                <span  class="fr red mouseDefault"  @click="goNone()">绑定</span>
            </li>
            <li class="hide"><img  src="@/assets/images/icon_error.png">
                <span  class="ml20">实名认证</span>
                <p  class="fl">请先进行实名认证。</p>
                <span  class="fr red ml25 mouseDefault"></span>
                <span  class="fr red mouseDefault"  @click="goNone()">认证</span>
                <span class="fr red"></span>
            </li>
            <li class="hide"><img  src="@/assets/images/icon_error.png">
                <span  class="ml20">我的地址</span>
                <p  class="fl"></p>
                <span  class="fr red ml25 mouseDefault"></span>
                <span  class="fr red mouseDefault"  @click="goNone()">添加</span>
            </li>
        </ul>
  </div>
</template>

<script>
import "@/lib/clipboard.min.js";
export default {
  name: "accountSet",
  data() {
    return {
      routerList: [
        "setCash",
        "setCash",
        "setCash",
        "setCash",
        "setCash",
        "setCash"
      ],
      account: "未绑定",
      email: "未绑定",
      lever:'低',
      widthBar:'width: 25%',
      bar:25,
      extension_code: "",
      authen:0,
      austatus:'去认证',
      isfPwd:0,
      psrc: require("@/assets/images/icon_error.png"),
      esrc: require("@/assets/images/icon_error.png"),
      asrc: require("@/assets/images/icon_error.png"),
      fsrc: require("@/assets/images/icon_error.png"),
    };
  },
  created() {
    this.userInfo();
  },
  methods: {
    goTo(index) {
      // this.$router.push({name: this.routerList[index]})
      layer.msg("暂未开放...");
    },
    goNone() {
      layer.msg("暂未开放...");
    },
    goPwd() {
      this.$router.push("/forgetPwd");
    },
    userInfo() {
      this.$http({
        url: "/api/" + "user/info",
        method: "get",
        data: {},
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          console.log(res);
          if (res.data.type == "ok") {
            
            
            if (res.data.message.phone) {
              this.account = res.data.message.phone;
              this.psrc = require("@/assets/images/success.png");
              this.bar=this.bar+25;
            }
            if (res.data.message.email) {
              this.email = res.data.message.email || '未绑定';
              this.esrc = this.email == '未绑定'?require("@/assets/images/icon_error.png"):require("@/assets/images/success.png");
              if(this.esrc=='已绑定'){
                this.bar=this.bar+25;
              }
            }
            if (res.data.message.paypassword==1){
              this.fsrc=require("@/assets/images/success.png");
              this.isfPwd=1;
            }
            this.extension_code = res.data.message.extension_code;
            this.authen=res.data.message.review_status;
            if(this.authen==2){
              this.asrc=require("@/assets/images/success.png")
              this.bar=this.bar+25;
            }
            console.log(this.bar)
            if(this.bar==50){
              this.lever='中';
            }else if(this.bar==75){
              this.lever='高'; 
            }else if(this.bar==100){
              this.lever='强';
            }
            this.widthBar='width:'+this.bar+'%';
          }
        })
        .catch(error => {});
    },
    copy() {
      var that = this;
      var clipboard = new Clipboard("#copy", {
        text: function() {
          return (
            
            
            that.extension_code
          );
        }
      });
      clipboard.on("success", function(e) {
        that.flags = true;
        layer.msg("复制成功");
      });
      clipboard.on("error", function(e) {
        that.flags = false;
        layer.msg("请重新复制");
      });
    }
  }
};
</script>

<style lang='scss'>
$navBack: #181b2a;
$red: #d45858;
$line: #303b4b;
$fColor2: #637085;
#user-security {
  padding-left: 34px;
  padding-right: 34px;
  padding-top: 34px;
  min-height: 800px;
  .bar-bottom {
    width: 320px;
    height: 8px;
    border-radius: 4px;
    background-color: $navBack;
    margin: 22px 0 12px 0;
    overflow: hidden;
    .bar-top {
      background-color: $red;
      height: 100%;
    }
  }
  ul {
    color: $fColor2;
    font-size: 14px;
    img {
      width: 16px;
      vertical-align: middle;
    }
    li {
      border-top: 1px solid #ccc;
      line-height: 72px;
      position: relative;
      p {
        position: absolute;
        left: 300px;
        top: 0;
      }
    }
  }
}
</style>
