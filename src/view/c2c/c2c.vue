<template>
  <div id="c2cpage" class="flex">
    <div class="c2c-l">
      <router-link to="/c2c" exact="">C2C</router-link>
      <router-link to="/c2c/myTransaction" exact="">{{$t('c2c.myTc2c')}}</router-link>
      <router-link to="/c2c/publishC2c" exact="">{{$t('c2c.pc2c')}}</router-link>
      <router-link to="/c2c/myPublishedC2c" exact="">{{$t('c2c.mypc2c')}}</router-link>
    </div>
    <div class="c2c-r">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      token:'',
      buyPms:{
        price:'',
        number:'',
        min_number:'',
        way:'ali_pay'
      },
      sellPms:{
        price:'',
        number:'',
        min_number:'',
        way:'ali_pay'
      }
      
    }
  },
  created(){
    this.token = window.localStorage.getItem('token') || '';
  }
};
</script>

<style lang='scss'>
#c2cpage {
  margin: 30px  auto 0;
  // width: 1200px;
  justify-content: center;
  min-height: 500px;
  > .c2c-l {
    margin-right: 20px;
    padding-bottom: 20px;
    width: 200px;
    
    background: #fff;
    >a{
      display: block;
      padding-left: 30px;
      line-height: 50px;
    }
    >.router-link-active{
      background: #194B64;
      color: #fff;
    }
  }
  >.c2c-r{
    // padding: 30px;
    width: 1200px;
    background: #fff;
    >div{
      margin: 0 auto;
      padding: 20px 30px;
      // background: #fff;
    }
    
  }
  
}
</style>
