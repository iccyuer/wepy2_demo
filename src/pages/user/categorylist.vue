<template>
    <div>
        <h2>categorylist</h2>
        <view v-for="(pic, index) in picList" :key="index">
            <image :src="pic" />
        </view>  
        
        <!-- http://localhost:3000/public/temp.xlsx -->
        <button @click="chooseImage">chooseImage</button>
        <button @click="downloadFile">downloadFile</button>
        <button @click="getFileSystemManager">getFileSystemManager</button>
    </div>
</template>

<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        picList: []
    },
    methods: {
        chooseImage() {
            let that = this;
            wx.chooseImage({
                count: NaN,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    console.log('chooseImage-success', res);
                    that.picList = res.tempFilePaths;
                },
                fail(err) {
                    console.log('chooseImage-fail', err);
                    wx.showToast({
                        title: err.errMsg,
                        icon: 'none'
                    });
                }
            })
        },
        downloadFile() {
            wx.downloadFile({
                // url: 'http://192.168.24.216:3000/public/temp.xlsx',
                url: 'http://192.168.24.216:3000/public/a.pdf',
                // filePath: wx.env.USER_DATA_PATH + '/temp1.xlsx',
                success(res) {
                    console.log('downloadFile-success', res);
                    wx.saveFile({
                        tempFilePath: res.tempFilePath || res.filePath,
                        filePath: wx.env.USER_DATA_PATH + '/temp.pdf',
                        success(res) {
                            console.log('saveFile-success', res);
                        },
                        fail(err) {
                            console.log('saveFile-success', err);
                        }
                    })
                    // wx.openDocument({
                    //     filePath: res.tempFilePath || res.filePath,
                    //     fileType: 'pdf',
                    //     showMenu: true,
                    //     success(res) {
                    //         console.log('openDocument-success', res);
                    //     },
                    //     fail(err) {
                    //         console.log('openDocument-success', err);
                    //     }
                    // })
                },
                fail(err) {
                    console.log('downloadFile-fail', err);
                }
            })
        },
        getFileSystemManager() {
            let fs = wx.getFileSystemManager()
            let result = fs.readFileSync(wx.env.USER_DATA_PATH + '/temp1.xlsx')
            console.log('result', result);
        }
    }
})

</script>
