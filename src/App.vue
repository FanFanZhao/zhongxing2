<template>
  <div id="app" class="bg-main">
    {{$i18n.value}}
    <router-view></router-view>
    <index-footer></index-footer>
  </div>
</template>

<script>
import IndexFooter from './view/indexFooter';
export default {
  name: 'App',
  components:{IndexFooter},
  created(){
    var theme = window.localStorage.getItem('theme');
    if(theme == 'dark'){
      this.$changeTheme('dark');
    }
  }
}
</script>

<style>
#app {
width: 100%;
height: 100%;
min-height: 1080px;
position: relative;
}
</style>
