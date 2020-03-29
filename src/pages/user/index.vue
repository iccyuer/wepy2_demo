<template>
    <div>
        <h2>index</h2>
        <!-- <image src="../../static/images/ico_home.png" /> -->
        <button @click="handleClick">click me</button>
    </div>
</template>
<script>
import wepy from '@wepy/core';
import eventHub from '../../common/eventHub';
import testMixin from '../../mixins/test.js'

  wepy.page({
      mixins: [testMixin],
      onLoad(obj) {
          console.log('index-page-load', obj);
          console.log('page', this);
          eventHub.$on('appLaunched', () => {
              console.log('page-appLaunched');
          })
      },
      onShow(obj) {
          console.log('index-page-show', obj);
      },
      onReady(obj) {
          console.log('index-page-ready', obj);
      },
      onHide(obj) {
          console.log('index-page-hide', obj);
      },
      onUnload(obj) {
          console.log('index-page-unload', obj);
      },
      onAppLaunched(obj) {
          console.log('index-page-applaunched', obj);
      },
      methods: {
          handleClick() {
              console.log(document, window);
            //   wx.showModal({
            //       title: 'title'
            //   })
            // wx.showToast()
            // wx.showLoading({
                // mask: true
            // })
            // wx.showActionSheet()
          }
      }
  })
</script>

<style>
div{
    font-size: 20px;
}
</style>

