<template>
    <div id="register-box" class="bg-main clr-part">
        <indexHeader></indexHeader>
        <div class="reg-content">
            <div class="title">注册</div>
            <div class="tab">
                <span :class='{active:isMb}' @click="setIsMb(true)">手机号注册</span>
                <span :class="{active:!isMb}" @click="setIsMb(false)">邮箱注册</span>
            </div>
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
                    <div class="tip" v-if="isMb">请输入手机号</div>
                    <div class="tip" v-if="!isMb">请输入邮箱</div>
                    <div class="flex">
                      <select name="" v-if="isMb" class="chooseTel" v-model="areaCode" ref="select">
                        <option :value="item.area_code" v-for="(item,index) in country" :key="index">{{item.area_code}} {{item.name_cn}}</option>
                      </select>
                    <input type="text" v-if="isMb" v-model="account" class="phone">
                    <input type="text" v-if="!isMb" v-model="account" class="">
                    </div>
                </div>
                    <div class="tip" style="margin-bottom:10px">请输入验证码</div>
                <div class="code-box bdr-part">
                    <input type="text" v-model="code" class="code">
                    <button type='button' class="code-btn redBg " @click="sendCode">发送验证码</button>
                </div>
                <!-- <button class="confirm-btn redBg" @click="checkCode" type="button">确认</button> -->
            </div>
            <div class="setpass">
                <!-- <div class="title">设置地区</div> -->
                <!-- <div class="area-box">
                  <div class="area">
                    <div :class="['province',{light:showList == 'provinces'}]" @click="showList = showList?false:'provinces'">{{province.name}}</div>
                    <div :class="['city',{light:showList =='cities'}]" @click="showList = showList?false:'cities'">{{city.name}}</div>
                    <div :class="['districts',{light:showList == 'districts'}]" @click="showList = showList?false:'districts'">{{district.name}}</div>
                  </div>
                  <div class="area-list" v-if="showList">
                    <ul class="provinces" v-if="showList == 'provinces'">
                      <li v-for="(item,index) in provinces" :key="index" @click="getRegion(item.id,'cities',item.region_name)">{{item.region_name}}</li>
                    </ul>
                    <ul class="cities" v-if="showList == 'cities'">
                      <li v-for="(item,index) in cities" :key="index" @click="getRegion(item.id,'districts',item.region_name)">{{item.region_name}}</li>
                    </ul>
                    <ul class="districts" v-if="showList == 'districts'">
                      <li v-for="(item,index) in districts" :key="index" @click="getRegion(item.id,'',item.region_name)">{{item.region_name}}</li>
                    </ul>
                  </div>
                </div> -->
                
                <!-- <div class="title">设置密码</div> -->
                <div class="pwd-box">
                    <div class="tip">请输入登录密码</div>
                    <input type="password" v-model="pwd" class="pwd-input" placeholder="密码在6-16位之间,由数字和字母组成">
                </div>
                <div class="repwd-box">
                    <div class="tip">请确认密码</div>
                    <input type="password" v-model="repwd" class="repwd-input" placeholder="请确认密码">
                </div>
                <div class="invite-box">
                    <div class="tip">请输入邀请码</div>
                    <input type="password" placeholder="选填" v-model="invite" class="invite-input">
                </div>
                <button type="button" @click="register" class="reg-btn confirm-btn redBg">确认</button>
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
      areaCode:'+86'
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
      codeBtn.innerHTML = "验证码";
      //console.log(codeBtn);
    },
    // 发送验证码
    sendCode(e) {
      let isMb = this.isMb;
      let url = "sms_send";
      if (this.account == "") {
        layer.msg("请输入账号");
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
          layer.msg("您输入的邮箱不符合规则");
          return;
        } else {
          url = "sms_mail";
        }
      } else {
      }
      var time = 60;
      var timer = null;
      timer = setInterval(function() {
        e.target.innerHTML = time + "秒";
        e.target.disabled = true;
        if (time == 0) {
          e.target.innerHTML = "验证码";
          e.target.disabled = false;
          clearInterval(timer);
          return;
        }
        time--;
      }, 1000);
      
      let data = { user_string: this.account };
      if(url == 'sms_send'){
         data.front = this.areaCode
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
        layer.msg('请输入账号');return;
      }
      else if (this.code == "") {
        layer.msg("请输入验证码");
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
      if(this.isMb){
        if(this.account == ''){
          layer.msg('请输入手机号');
          return;
        }else if(this.code == ''){
           layer.msg('请输入验证码');
           return;
        }
      }
      if(!this.isMb){
        if(this.account == ''){
          layer.msg('请输入邮箱');
          return;
        }
        var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!emreg.test(this.account)) {
          layer.msg("您输入的邮箱不符合规则");
          return;
        }
         if(this.code == ''){
           layer.msg('请输入验证码');
           return;
        }
      }
      var regPsws = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
      if (this.pwd == "") {
        layer.msg("请输入密码");
        return;
      }else if(this.pwd.length <6 || this.pwd.length >16){
        layer.msg('密码只能在6-16位之间');return;
      }else if(!regPsws.test(this.pwd)){
         layer.msg('密码必须由数字和字母组成');return;
      }
       else if (this.repwd == "") {
        layer.msg("请再次输入密码");
        return;
      } else if (this.pwd !== this.repwd) {
        layer.msg("两次输入的密码不一致");
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
