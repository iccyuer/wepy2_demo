<style lang="less">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>

<script>
import wepy from '@wepy/core';
import eventHub from './common/eventHub';
import store from './store';

// wepy.$store = store
// wepy.$qwer = 123


wepy.app({
  store: store,
  hooks: {
    // App 级别 hook，对整个 App 生效
    // 同时存在 Page hook 和 App hook 时，优先执行 Page hook，返回值再交由 App hook 处
    'before-setData': function (dirty) {
      console.log('setData dirty: ', dirty);
      return dirty;
    }
  },
  globalData: {
    userInfo: null,
    token: 123,
    launched: false
  },


  async onLaunch(obj) {
    // this.$set(this, '$store', store)
    console.log('app-launch-start', obj);
    // await this.sleep(3);
    eventHub.$on('app-launch', (...args) => {
      console.log('app-launch event emitted, the params are:');
      console.log(args);
    });
    console.log('app-launch-end');
    this.$options.globalData.launched = true;
    // this.$options.store.dispatch('set_launched', true);
    console.log('this', this);
    console.log('store', store);
    eventHub.$emit('appLaunched')
    // console.log('app', this);
    // console.log('wx', wx);
    // wx.hideTabBar();
  },

  onShow(obj) {
    console.log('app-show', obj);                                                                                                                                                                    
  },

  onHide(obj) {
    console.log('app-hide', obj);
  },

  onError(obj) {
    // console.log('app-error', obj);
  },

  methods: {

    sleep (s) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('promise resolved')
        }, s * 1000)
      })
    },

    async testAsync () {
      let d = await this.sleep(3);
      console.log(d);
    }
  }
},{
  lifecycle: {
    app: 'onSomeTime',
    page: 'onAppLaunched'
  }
});
</script>
<config>
{
    pages: [
      // 'pages/index'
      // 'pages/home',
      'pages/user/index',
      'pages/user/categorylist',
      'pages/user/cart',
      'pages/user/profile'
    ],
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      backgroundColor: "#ffffff",
      borderStyle: "white",
      selectedColor: "#fe786d",
      color: "#000000",
      list: [
        {
          pagePath: "pages/user/index",
          iconPath: "static/images/ico_home.png",
          selectedIconPath: "static/images/ico_home_pressed.png",
          text: "首页"
        },
        {
          pagePath: "pages/user/categorylist",
          iconPath: "static/images/ico_category.png",
          selectedIconPath: "static/images/ico_category_pressed.png",
          text: "分类"
        },
        {
          pagePath: "pages/user/cart",
          iconPath: "static/images/ico_cart.png",
          selectedIconPath: "static/images/ico_cart_pressed.png",
          text: "购物车"
        },
        {
          pagePath: "pages/user/profile",
          iconPath: "static/images/ico_my.png",
          selectedIconPath: "static/images/ico_my_pressed.png",
          text: "我的"
        }
      ]
    }
    // "tabBar": {
    //   "custom": true,
    //   backgroundColor: "#ffffff",
    //   borderStyle: "white",
    //   selectedColor: "#fe786d",
    //   color: "#000000",
    //   "list": [
    //     {
    //       pagePath: "pages/user/index",
    //       iconPath: "static/images/ico_home.png",
    //       selectedIconPath: "static/images/ico_home_pressed.png",
    //       text: "首页"
    //     },
    //     {
    //       pagePath: "pages/user/categorylist",
    //       iconPath: "static/images/ico_category.png",
    //       selectedIconPath: "static/images/ico_category_pressed.png",
    //       text: "分类"
    //     }
    //   ]
    // },
    // "usingComponents": {}
}
</config>
