<template>
    <div>
        <h2>index</h2>
        <!-- <image src="../../static/images/ico_home.png" /> -->
        <image src="../../images/ico_my_pressed.png" />
        <div>{{form2.a}}</div>
        <pic src="./images/meishi2.jpg{{}}" :form="form2" form2="12!"></pic>
        <!-- <template
          v-for="(img, index) in images"
        >
          <image :key="index" :src="img" />
        </template> -->
        <div>launched: {{launched}}</div>
        {{result.environment}}
        <button @click="handleClick">click me</button>
        <button @click="login">login</button>
        <button @click="getUserInfo">getUserInfo</button>
        <button @click="getSetting">getSetting</button>
        <button @click="openSetting">openSetting</button>
        <button @click="authorize">authorize(userLocation)</button>
        <button open-type="getUserInfo">authorize(userInfo)</button>
    </div>
</template>
<config>
{
    navigationBarTitleText: '好集楽',
    usingComponents: {
		"pic": "~@/components/pic",
    }
}
</config>
<script>
import wepy from '@wepy/core';
import eventHub from '../../common/eventHub';
import baseMixin from '../../mixins/base.js';

wepy.page({
  mixins: [baseMixin],
  data: {
    result: {},
    images: ['http://localhost:3000/public/100.png'],
    launched: false,
    form2: {
      a: 'c',
      bb: 1234
    },
    form3:'hello'
  },
  onLoad(obj) {
    console.log('index-page-load', obj);
    console.log('page', this);
    //   console.log('@@@', this.$app.$options.globalData.launched);
    eventHub.$on('appLaunched', () => {
      console.log('page-appLaunched');
      //   console.log('@@@', this.$app.$options.globalData.launched);
      this.launched = this.$app.$options.globalData.launched;
    });
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
    async handleClick() {
      this.images.push('http://localhost:3000/public/1001.png');
			// let result = await wx.get('http://localhost:4009/api/be/rc/category/query_limits2')
			// console.log('result', result);
      //   let result = wx.getSystemInfoSync();
      //   console.log(result);
      //   this.result = result;
      //   console.log(document, window);
      //   wx.showModal({
      //       title: 'title'
      //   })
      // wx.showToast()
      // wx.showLoading({
      // mask: true
      // })
      // wx.showActionSheet()
    },
    login() {
      wx.login({
        success(res) {
          console.log('res', res);
          if (res.code) {
            //发起网络请求
            // resolve(res)
          } else {
            // reject('登录失败！' + res.errMsg)
          }
        }
      });
    },
    getUserInfo() {
      wx.getUserInfo({
        success(res) {
          console.log('success-res', res);
        },
        fail(res) {
          console.log('fail-res', res);
        }
      });
    },
    getSetting() {
      wx.getSetting({
        success(res) {
          console.log('success-res', res);
        },
        fail(res) {
          console.log('fail-res', res);
        }
      });
    },
    openSetting() {
      wx.openSetting({
        success(res) {
          console.log('success-res', res);
        },
        fail(res) {
          console.log('fail-res', res);
        }
      });
    },
    authorize() {
      wx.authorize({
        scope: 'scope.userLocation',
        success(res) {
          console.log('success-res', res);
        },
        fail(res) {
          console.log('fail-res', res);
        }
      });
    }
  }
});
</script>

<style>
div {
  font-size: 20px;
}
</style>

