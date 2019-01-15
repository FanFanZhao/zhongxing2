<template>
    <div id="register-box" class="bg-main clr-part">
        <indexHeader></indexHeader>
        <div class="reg-content">
            <div class="title">{{$t('regidters')}}</div>
            <!-- <div class="tab">
                <span :class='{active:isMb}' @click="setIsMb(true)">{{$t('register.phone')}}</span>
                <span :class="{active:!isMb}" @click="setIsMb(false)">{{$t('register.email')}}</span>
            </div> -->
            <div class="step-one" v-show="!codeTrue">
                 <!-- <div class="account-box">
                    <div class="tip " v-if="isMb">请选择国籍</div>
                    <select class="chooseCountry" v-if="isMb">
                      <option value="">中国</option>
                       <option value="">英国</option>
                        <option value="">美国</option>
                    </select>
                </div> -->
                <div class="account-box">
                    <div class="tip" v-if="isMb">{{$t('register.phonenum')}}</div>
                    <div class="tip" v-if="!isMb">{{$t('register.emailnum')}}</div>
                    <div class="flex">
                      <select name="" v-if="isMb" class="chooseTel" v-model="areaCode" ref="select">
                        <option :value="index" v-for="(item,index) in country" :key="index">{{item.area_code}} {{item.name_cn}}</option>
                      </select>
                    <input type="text" v-if="isMb" v-model="account" class="phone">
                    <input type="text" v-if="!isMb" v-model="account" class="">
                    </div>
                </div>
                    <div class="tip" style="margin-bottom:10px;">{{$t('register.codenum')}} <span class="red" style="margin-left:10px;">({{$t('register.notice')}})</span></div>
                <div class="code-box bdr-part">
                    <input type="text" v-model="code" class="code">
                    <button type='button' class="code-btn redBg " :disabled="isCheck?false:true"  :class="[isCheck?'':'pointer']"  @click="sendCode">{{$t('register.sendcode')}}</button>
                </div>
                <!-- <button class="confirm-btn redBg" @click="checkCode" type="button">确认</button> -->
            </div>
            <div class="setpass">
                <div class="pwd-box pass-box">
                    <div class="tip">{{$t('register.logpwd')}}</div>
                    <input :type="showpass?'text':'password'" class="pwd-input" maxlength="16" v-model="pwd" id="pwd" :placeholder="$t('register.pwd')">
                        <img src="../assets/images/showpass.png" alt="" v-if="showpass" @click="showpass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showpass" @click="showpass = true">
                </div>
                <div class="repwd-box pass-box">
                    <div class="tip">{{$t('register.repwd')}}</div>
                    <input :type="showrepass?'text':'password'" class="repwd-input" maxlength="16" v-model="repwd" >
                        <img src="../assets/images/showpass.png" alt="" v-if="showrepass" @click="showrepass = false">
                        <img src="../assets/images/hidepass.png" alt="" v-if="!showrepass" @click="showrepass = true">
                </div>
                <div class="invite-box">
                    <div class="tip">{{$t('register.invitecode')}}</div>
                    <input type="text" :placeholder="$t('register.xuan')" v-model="invite" class="invite-input">
                </div>
                <p class="flex alcenter ft14">
                  <input id="agree" class="aggre" v-model="isCheck" @click="check" type="checkbox" /><label for="agree">{{$t('register.agree')}} <router-link to="/aggrement" class="link_text">{{$t('footer.xieyi')}}</router-link></label>
                </p>
                <button type="button" @click="register" :disabled="isCheck?false:true" :class="[isCheck?'':'pointer']" class="reg-btn confirm-btn redBg">{{$t('confirm')}}</button>
            </div>
            </div>
    </div>
</template>

<script>
import country from '../lib/country.js'
import indexHeader from "@/view/indexHeader";
export default {
  components: {
    indexHeader
  },
  data() {
    return {
      showpass:false,
      showrepass:false,
      codeTrue: false,             //验证码是否正确
      isMb: true,                  //是否为手机注册
      account: "",                //用户名
      pwd: "",                    //密码
      repwd: "",                  //重复密码
      code: "",                   //验证码
      invite: "",                  //邀请码
      timer: "",                  //倒计时timer
      showList: false,            //是否显示地址列表
      country:country,
      areaCode:0,
      disable:true,
      isCheck:false
      //province: { id: "", name: "请选择省" },      //所选省份
      //provinces: [],                              //省份列表

      //city: { id: "", name: "请选择市" },         //所选城市
      //cities: [],                                //城市列表

      //district: { id: "", name: "请选择区" },     //所选地区
      //districts: []                              //地区列表
    };
  },
  created() {
    //获取所有省份
    console.log(this.country)
  },
  methods: {
    check:function(val){
        if(this.isCheck == false){
          console.log('pppp')
          this.disable = true;
        }else{
           this.disable = false;
        }
    },
    // 获取地区列表
    // getRegion(id, type, name) {
    //   if (type == "") {
    //     this.showList = false;
    //     this.district = { id: id, name: name };
    //     return;
    //   } else if (type == "cities") {
    //     if (name == this.province.name) {
    //       this.showList = "cities";
    //       return;
    //     }
    //   } else if (type == "districts") {
    //     if (name == this.city.name) {
    //       this.showList = "districts";
    //       return;
    //     }
    //   }
    //   var pId = '';
    //   //  if(id != ''){
    //   //    data.parent_id = id;
    //   //  }
    //   if (id !== "") {
    //     pId = "?parent_id=" + id;
    //   }
      

    //   this.$http({
    //     url: "/api/region" + pId,
    //     method: "get"
    //   }).then(res => {
    //     //console.log(res.data);
    //     if(res.data.type == 'ok'&&res.data.message.length != 0){

    //       if (type == "provinces") {
    //         this.provinces = res.data.message;
    //       } else if (type == "cities") {
    //         this.province = { name: name, id: id };
    //         this.city = { id: "", name: "请选择市" };
    //         this.district = { id: "", name: "请选择区" };
    //         this.showList = "cities";
    //         this.cities = res.data.message;
    //       } else {
    //         this.district = { id: "", name: "请选择区" };
    //         this.showList = "districts";
    //         this.city = { name: name, id: id };
    //         this.showCities = false;
    //         this.districts = res.data.message;
    //       }
    //     }
    //   });
    // },
    // 切换注册方式
    setIsMb(boo) {
      var that = this;
      this.account = "";
      this.pwd = "";
      this.repwd = "";
      this.code = "";
      this.invite = "";
      this.isMb = boo;
      this.codeTrue = false;
      this.showList = false;
      // this.provinces = [];this.cities = [];this.districts = [];
      // this.province = { id: "", name: "请选择省" };
      // this.city = { id: "", name: "请选择市" };
      // this.district = { id: "", name: "请选择区" };
      
      clearInterval(this.timer);
      var codeBtn = document.querySelector(".code-btn");
      codeBtn.disabled = false;
      codeBtn.innerHTML = that.$t('code');
      //console.log(codeBtn);
    },
    // 发送验证码
    sendCode(e) {
      var that = this;
      let isMb = this.isMb;
      let url = "sms_send";
      if (this.account == "") {
        layer.msg(that.$t('lay.paccount'));
        return;
      } else if (e.target.disabled) {
        return;
      } else if (isMb) {
        // var reg = /^1[345678]\d{9}$/;
        // if (!reg.test(this.account)) {
        //   layer.msg("您输入的手机号不符合规则");
        //   return;
        // }
      } else if (!isMb) {
        var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!emreg.test(this.account)) {
          layer.msg(that.$t('lay.noemial'));
          return;
        } else {
          url = "sms_mail";
        }
      } else {
      }
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
      
      let data = { user_string: this.account,type:'regist' };
      if(url == 'sms_send'){
         data.front = country[this.areaCode].area_code
      }
      var loa = layer.load();
      this.$http({
        url: "/api/" + url,
        method: "post",
        data: data
      }).then(res => {
        layer.close(loa);
        //console.log(res);
        layer.msg(res.data.message);
      });
    },
    // 验证验证码
    checkCode() {
      let code = this.code;
      if(this.account == ''){
        layer.msg(this.$t('lay.paccount'));return;
      }
      else if (this.code == "") {
        layer.msg(this.$t('lay.notcode'));
        return;
      } else {
        let data = {};
        let url = "user/check_email";
        if (this.isMb) {
          data = { mobile_code: this.code };
          url = "user/check_mobile";
        } else {
          data = { email_code: this.code };
        }
       var loa = layer.load();
        this.$http({
          url: "/api/" + url,
          method: "post",
          data: data
        }).then(res => {
          layer.close(loa);
          layer.msg(res.data.message);

          if (res.data.type == "ok") {
            this.codeTrue = true;
            // this.getRegion("", "provinces");
          } else {
          }
        });
      }
    },
    // 注册
    register() {
      console.log(this.code)
      var that = this;
      if(this.isMb){
        if(this.account == ''){
          layer.msg(that.$t('lay.nophone'));
          return;
        }else if(this.code == ''){
           layer.msg(this.$t('lay.notcode'));
           return;
        }
      }
      if(!this.isMb){
        if(this.account == ''){
          layer.msg(that.$t('lay.nemail'));
          return;
        }
        var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!emreg.test(this.account)) {
          layer.msg(that.$t('lay.noemail'));
          return;
        }
         if(this.code == ''){
           layer.msg(this.$t('lay.notcode'));
           return;
        }
      }
      var regPsws = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
      if (this.pwd == "") {
        layer.msg(that.$t('lay.inpwd'));
        return;
      }else if(this.pwd.length <6 || this.pwd.length >16){
        layer.msg(that.$t('lay.pwdlength'));return;
      }else if(!regPsws.test(this.pwd)){
         layer.msg(that.$t('lay.pwdcom'));return;
      }
       else if (this.repwd == "") {
        layer.msg(that.$t('lay.repwd'));
        return;
      } else if (this.pwd !== this.repwd) {
        layer.msg(that.$t('lay.twopwd'));
        return;
      } else {
      }
      var data = {};
      // data.province_id = this.province.id;
      // data.city_id = this.city.id;
      // data.district_id = this.district.id;
      var isMb = this.isMb;
      data.type = isMb ? "mobile" : "email";
      data.user_string = this.account;
      data.code = this.code;
      data.password = this.pwd;
      data.re_password = this.repwd;
      data.extension_code = this.invite;
      
      if(isMb){
        var index = this.$refs.select.selectedIndex;
        data.nationality = this.country[index].name_cn
        console.log(this.country[index].name_cn)
      }
      //console.log(data);return;
      var loa = layer.load();
      this.$http({
        url: "/api/" + "user/register",
        data: data,
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }    
      }).then(res => {
        layer.close(loa);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.$router.push("/components/login");
        }
      });
    }
  }
};
</script>

<style lang='scss'>
.aggre{
  width: 16px!important;
  margin-right: 5px;
}
.link_text{
  color: #d45858;
}
.pointer{
  cursor: not-allowed!important;
  opacity: 0.6;
}
.chooseCountry{
      width: 520px;
    min-height: 46px;
    border-radius: 3px;
    padding: 0 15px;
    border-color: #ccc;
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
#register-box {
  min-height: 1050px;
  button{
    border-radius: 2px;
  }
  .tip {
    margin: 10px 0;
    // color: #61688a;
    font-size: 12px;
  }
  .reg-content {
    padding: 100px 100px;
    > div > div {
      margin: 10px 0 30px;
    }

    // color: #c7cce6;
    input {
      width: 520px;
      min-height: 46px;
      border: 1px solid #ccc;
      padding: 0 20px;
      // color: #c7cce6;
      font-size: 14px;
      border-radius: 3px;
      //background-color: #1e2235;
    }
    > .title {
      font-size: 30px;
    }
    > .tab {
      margin: 10px 0 20px;
      cursor: pointer;
      span {
        margin: 0 20px;
      }
    }
    .code-box {
      display: flex;
      justify-content: space-between;
      width: 520px;
      height: 46px;
      //background-color: #1e2235;
      background: #fff;
      border: 1px solid #ccc;
      input {
        border: none;
        height: 44px;
        min-height: 44px;
        width: 420px;
      }
      button {
        border: none;
        line-height: 45px;
        width: 93px;
        color: #fff;
        // color: #c7cce6;
        // border-left: 1px solid #c7cce6;
        // //background: #1e2235;
      }
    }
  }
  .reg-btn,
  .confirm-btn {
    line-height: 46px;
    width: 200px;
    margin: 20px 0 0;
    border: none;
    //background: #7a98f7;
    color: #fff;
    cursor: pointer;
  }
  .area-box {
    position: relative;
    width: 520px;
    line-height: 44px;
    // //background-color: #1e2235;
    // color: #c7cce6;
    text-align: center;
    height: 46px;
    .light {
      color: #d45858;
    }
    // overflow: hidden;
    .area {
      display: flex;
      border: 1px solid #ccc;
      > div {
        flex: 1;
      }
      .city {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
    .area-list {
      position: absolute;
      width: 520px;
      top: 46px;
      left: 0;
      display: flex;
      z-index: 999;

      > ul {
        flex: 1;
        //background-color: #1e2235;
        height: 265px;
        overflow: scroll;
      }
      > ul::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>



