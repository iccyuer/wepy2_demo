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
import vuex from '@wepy/x';

wepy.use(vuex);


wepy.app({
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
    token: 123
  },

  /**
   * ajax
   */
  Prequest(method = 'GET'){
    let that = this;
    return function(url, data = {}, header = {}) {
      console.log(`发${method}请求:${url}`);
      // log.info(`发${method}请求:${url}`);
      return new Promise(function(resolve, reject) {
        if (!that.globalData.token) {
          return reject('token is null');
        }
        let defaultheader = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${that.globalData.token}`
        };
        for (let key in header) {
          defaultheader[key] = header[key];
        }
        wx.request({
          url,
          data,
          method,
          header: defaultheader,
          success: function(res) {
            console.log('ajax-success', res);
            if (res && res.data) {
              if (res.data.errCode == '200002') {
                //token 失效
                wx.showModal({
                  confirmColor: '#7ec792',
                  content: `登陆凭证失效，重新获取中`,
                  showCancel: false,
                  success: async function() {
                    wx.removeStorageSync('user:token');
                    await that.refreshToken();
                    //wx.navigateTo({ url: "/pages/auth/refreToken" });
                    wx.startPullDownRefresh();
                  }
                });
                wx.hideLoading();
                reject(res);
                return;
              } else if (res.data.errorCode) {
                console.error(res);
                let msg =
                  res.data.errorMsg || res.data.messasge || res.data.errmsg;
                wx.showModal({
                  confirmColor: '#7ec792',
                  content: msg,
                  showCancel: false
                });

                wx.hideLoading();
                reject(res);
                return;
              }
            }
            resolve(res.data);
          },
          fail: function(err) {
            console.error('系统错误', err);
            // log.error(
            //   '请求错误的信息是' + JSON.stringify(err) + '请求错误的URL是' + url
            // );
            let errorMsg = '';
            if (
              err.errMsg.indexOf('request:fail timeout') != -1 ||
              err.errMsg.indexOf('request:fail 请求超时') != -1 ||
              err.errMsg.indexOf('request:fail socket time') != -1
            ) {
              errorMsg = '网络超时，请刷新重试';
            }
            if (
              err.errMsg.indexOf('request:fail request unknow host error') != -1
            ) {
              errorMsg = '网络请求异常，请删除小程序重新进入';
            }
            wx.showModal({
              confirmColor: '#7ec792',
              content: errorMsg || err.errMsg,
              showCancel: false
            });
            wx.hideLoading();
            reject(err);
          }
        });
      });
    };
  },

  async onLaunch(obj) {
    console.log('app-launch-start', obj);
    wx.get = this.$options.Prequest("GET")
	  wx.post = this.$options.Prequest("POST")
    // await this.sleep(3);
    eventHub.$on('app-launch', (...args) => {
      console.log('app-launch event emitted, the params are:');
      console.log(args);
    });
    console.log('app-launch-end');
    this.$options.globalData.launched = true;
    console.log('this', this);
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
    console.log('app-error', obj);
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
