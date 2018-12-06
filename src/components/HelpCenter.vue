<template>
    <div id="user-setting" class="flex">
        <div class="account-wrap">
            <div class="account">
                <div class="notice_box bg-part" style="margin-top:8px;">
                    <notice :title='title'></notice>
                </div>
             </div>
        </div>
    </div>
</template>

<script>
import notice from "@/components/noticeList";
export default {
    components: {
    notice,
  },
  data(){
      return{
          title:'帮助中心'
      }
  }
};
</script>

<style lang='scss'>
.account-wrap{
    min-width: 1200px;
    max-width: 100%;
    margin: 0 auto;
}
.account{
    width: 1200px;
}
// body .bdr-part{
//     background-color: #f2f3f8 !important;
// }
</style>
