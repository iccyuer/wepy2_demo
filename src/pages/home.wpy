<style lang="less">
</style>
<wxs module="m1" lang="babel">
const getTime = (time) => {
  let date = getDate(time);
  let hour = date.getHours();
  let mins = date.getMinutes();
  let sec = date.getSeconds();
  let milli = date.getMilliseconds();
  return `${hour}:${mins}:${sec}.${milli}`;
}
module.exports.getTime = getTime;
</wxs>
<template>
  <div>
      <button @tap="handleTap">click me</button>
  </div>
</template>

<script>
  import wepy from '@wepy/core'
  import eventHub from '../common/eventHub';
  import { mapState } from '@wepy/x';
  import store from '../store';
  import testMixin from '../mixins/test'

  wepy.page({
    store,
    config: {
      navigationBarTitleText: 'test'
    },

    hooks: {
      // Page 级别 hook, 只对当前 Page 的 setData 生效。
      'before-setData': function (dirty) {
        if (Math.random() < 0.2) {
          console.log('setData canceled');
          return false; // Cancel setData
        }
        dirty.time = +new Date();
        return dirty;
      }
    },

    mixins: [testMixin],

    data: {
      inputmodel: 'v-model'
    },

    computed: {
      ...mapState([ 'counter' ])
    },

    methods: {
      async handleTap () {
        console.log('cick !')
        let result = await this.ajax()
        console.log('result', result)
      },
      ajax () {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  console.log('success')
                  resolve('success')
              }, 3000)
          })
      }
    },

    created () {
      let self = this
      self.currentTime = +new Date(); 

      self.setTimeoutTitle = '标题三秒后会被修改';
      setTimeout(() => {
        self.setTimeoutTitle = '到三秒了';
      }, 3000);

      wx.getUserInfo({
        success (res) {
          self.userInfo = res.userInfo;
        }
      });
    }
  });
</script>
<config>
{
    navigationBarTitleText: 'Home',
    usingComponents: {
    }
}
</config>
