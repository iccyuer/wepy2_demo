<template>
    <div>
        <h2>index--'{{env}}'--'{{name}}'</h2>
        <form action="">
          <input type="text" v-model="name" >
        </form>
        <div>??{{hehe}}??.{{$app.$options.store._vm.$$state.launched}}.</div>
        <!-- <image src="../../static/images/ico_home.png" /> -->
        <!-- <image src="../../components/images/meishi2.jpg" /> -->
        <image src="../../components/images/icon_category1.png" />
        <!-- <pic src="./images/meishi2.jpg{{}}"></pic> -->
        <pic src="./images/meishi2.jpg{{}}"></pic>
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
        <hr />
        <div v-for="(item, index) in list" :key="index" @tap="handleTap(item)">{{ item.name }}</div>
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
import { mapState, mapActions } from '@wepy/x';
import store from '../../store';

wepy.page({
  store,
  mixins: [baseMixin],
  data: {
    name: '',
    result: {},
    images: ['http://localhost:3000/public/100.png'],
    // launched: false,
    form2: {
      a: 'c',
      bb: 1234
    },
    form3:'hello',
    hehe: false,
    list: [
      { name: 11111  },
      { name: 22222  },
      { name: 33333  },
    ],
    env: ''
  },
  computed: {
    ...mapState([ 'launched' ]),
    // hehe() {
    //   return this.$app.$options.store._vm.$$state.launched
    // }
  },
  watch: {
    hehe(val) {
      console.log('hehe', val);
    }
  },
  onLoad(obj) {
    this.env = __wxConfig.envVersion;
    console.log('index-page-load', obj);
    console.log('page', this);
      // console.log('@@@', this.$app.$options.store._vm.$$state.launched);
    eventHub.$on('appLaunched', () => {
      console.log('page-appLaunched');
      //   console.log('@@@', this.$app.$options.globalData.launched);
      // this.launched = this.$app.$options.globalData.launched;
    });
    // let i = 0;
    // setInterval(() => {
    //   if (i%2 == 0) {
    //     this.$app.$options.store.dispatch('set_launched', true);
    //   } else {
    //     this.$app.$options.store.dispatch('set_launched', false);
    //   }
    //   i++;
    // }, 1000);
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
      // store.dispatch('launched', true);
      // this.$app.$options.globalData.launched = !this.$app.$options.globalData.launched;
      // console.log(this.$app.$options.globalData.launched);
      // this.images.push('http://localhost:3000/public/1001.png');
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
      console.log('name', this.name);
    },
    bindInput(e) {
      let value = e.detail.value;
      console.lgo('value', value);
      this.name = value;
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
    },
    handleTap(item) {
      // item = Math.random()
      // item.name = 'new'
      // this.$set(item, 'name', 'new')
      // item.a.name=Math.random()
      this.list[0].name=12345
      console.log(item, this.list)
    }
  }
});
</script>

<style>
div {
  font-size: 20px;
}
</style>

