<template>
    <div id="user-setting" class="flex">
        <div class="setting-l">
            <div class="setting-item blue_bg tc">
                <!-- <div class="item-title">收款方式</div> -->
                <router-link to="/userSetting">{{$t('set.secset')}}</router-link>
            </div>
        </div>
        <div class="setting-r">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
#user-setting {
    width:80%;
    margin: 0 auto;
    margin-top: 50px;
    min-height: 700px;
  > .setting-l {
      background: #fff;
      margin-right: 20px;
      padding: 20px;
      line-height: 40px;
    width: 23%;
    .router-link-active{
        color:#fff;
        text-align: center;
    }
  }
  .setting-r {
       background: #fff;
      padding: 20px;
    width: 77%;
  }
}
</style>
