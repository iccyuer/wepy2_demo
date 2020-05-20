<template>
    <view class="page">
        <!-- <web-view src="http://192.168.24.216:8080/"></web-view> -->
        <!-- http://192.168.24.216:8080/ -->
        <image src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJqByFWzlSo8TvCTz4Gq6Egtr1WCHWia81OG7v2AVUaicRUd9uyJotiakT06VgQ4wsbgVUia3w4LryQcw/132"></image>
        <image src="https://hjlfile.dawangtv.cn/2020/25163/93KSvsub7fwIeF-D9I_eKGjJ.jpg?x-oss-process=image/resize,w_325"></image>
        <!-- <view class="container1">
            <view class="page-body">
                <view class="page-section message">
                    <text wx:if="{{appear}}"> 小球出现 </text>
                    <text wx:else>  小球消失 </text>
                </view>
                <view class="page-section"> -->
                    <view class="scroll-view" scroll-y>
                        <view class="scroll-area" style="{{appear ? 'background: #ccc' : ''}}">
                            <text class="notice">向下滚动让小球出现</text>
                            <view class="filling"></view>
                            <view class="ball"></view>
                            <text class="notice">向下滚动让小球出现</text>
                            <view class="filling"></view>
                            <view class="ball"></view>
                            <text class="notice">向下滚动让小球出现</text>
                            <view class="filling"></view>
                            <view class="ball"></view>
                            <text class="notice">向下滚动让小球出现</text>
                            <view class="filling"></view>
                            <view class="ball"></view>
                        </view>
                    </view>
                <!-- </view>
            </view>
        </view> -->
    </view>
</template>

<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        appear: false
    },
    onLoad() {
        console.log('this.', this)
        let _observer = wx.createIntersectionObserver(this.$wx, { observeAll: true })
        console.log('_observer', _observer);
        _observer
            // .relativeToViewport({button: 0})
            .relativeTo('.scroll-view')
            .observe('.ball', (res) => {
                console.log(res);
                this.appear = res.intersectionRatio > 0
            })
    },
    onUnload() {
        if (this._observer) this._observer.disconnect()
    }
})

</script>

<style>
page{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background-color: red;
}
.scroll-view {
  width: 100%;
  height: 100%;
  background: #fff;
  /* border: 1px solid #ccc; */
  box-sizing: border-box;
  overflow-y: scroll;
}

.scroll-area {
  height: 8300rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: .5s;
}

.notice {
  margin-top: 450rpx;
}

.ball {
  width: 200rpx;
  height: 200rpx;
  background: #1AAD19;
  border-radius: 50%;
}

.filling {
  height: 800rpx;
}

.message {
  width: 100%;
  display: flex;
  justify-content: center;
}

.message text {
  font-size: 40rpx;
  font-family: -apple-system-font, Helvetica Neue,Helvetica,sans-serif;
}

</style>


