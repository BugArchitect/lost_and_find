// pages/publish/publish.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        multiArray: [
            ['证件类', '电子产品'],
            ['身份证', '校园卡', '其他'],
        ],    //类型选择栏的初始选择
        pickerList: [
            ['身份证', '校园卡', '其他'],
            ['手机', '笔记本电脑', '平板电脑', '相机', 'MP3','MP4','U盘','硬盘','耳机','其他'],
        ],    //选择栏内容
        multiIndex: [0, 0],     //类型选择栏下标初始化     
        select: false,      //判断是否处于选择状态
        name: '',   //物品名称
        date: '',   //发现/丢失时间
        region: '',     //发现/丢失地点
        contact: '',    //联系方式
        desc: '',   //物品描述
        imgList: [],    //用于储存上传图片的数组
        type: ''    //判断寻找类型的值
    },

    // 清空物品描述的内容
    clearDesc() {
        this.setData({
            desc: ''
        })
    },

    // 向物品名称赋值
    getName(e) {
        this.setData({
            name: e.detail.value
        })
    },

    // 向丢失/拾取时间赋值
    getDate(e) {
        this.setData({
            date: e.detail.value
        })
    },

    // 向丢失/拾取地点赋值
    getRegion(e) {
        this.setData({
            region: e.detail.value
        })
    },

    // 向联系方式赋值
    getContact(e) {
        this.setData({
            contact: e.detail.value
        })
    },

    // 向物品描述赋值
    getDesc(e) {
        this.setData({
            desc: e.detail.value
        })
    },

    // 
    bindMultiPickerChange(e) {
        // console.log(e)
        this.setData({
            select: true
        })
    },

    // 
    bindMultiPickerColumnChange(e) {
        // console.log(e)
        let {
            column,
            value
        } = e.detail
        let data = this.data
        let {
            multiArray,
            pickerList
        } = this.data
        if (column === 0) {
            // 替换展示的数据源
            multiArray[1] = pickerList[value]
        }
        data.multiArray = multiArray
        data.multiIndex[column] = value
        this.setData(data)
    },

    // 清空类型栏的选择
    clearSelect() {
        this.setData({
            select: false,
            multiIndex: [0, 0]
        })
    },

    // 上传图片
    uploadImage() {
        let {
            imgList
        } = this.data
        wx.chooseMedia({
            count: 6 - imgList.length,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                // console.log(res)
                const {
                    tempFiles
                } = res
                tempFiles.forEach(item => {
                    // imgList.unshift(item.tempFilePath)
                    wx.cloud.uploadFile({
                        cloudPath: `publish/${Math.floor(Math.random()*10000)}-${new Date().getTime()}.png`,
                        filePath: item.tempFilePath,
                        success: res => {
                            console.log('上传成功', res)
                            imgList.unshift(res.fileID)
                            this.setData({
                                imgList
                            })
                            wx.hideLoading()
                        }
                    })
                })
            }
        })
    },

    // 删除图片
    deleteImg(e) {
        let {
            index
        } = e.currentTarget.dataset
        let {
            imgList
        } = this.data
        imgList.splice(index, 1)
        this.setData({
            imgList
        })
    },

    // 
    selectType(e) {
        const {
            id
        } = e.currentTarget.dataset
        this.setData({
            type: id
        })
    },

    // 发布内容
    toPublish() {
        /**
         * 数据库字段
         * 
         * type  0 物 1主
         * classify
         * name
         * date
         * region
         * contact
         * desc
         * imgList
         */
        const {
            type,
            select,
            multiArray,
            multiIndex,
            name,
            date,
            region,
            contact,
            desc,
            imgList
        } = this.data;
        // 判断内容是否填充完整
        if (!type || !select || !name || !date || !region || !contact) {
            wx.showToast({
                icon:'none',
                title: '请将信息填写完整',
            });
            return;
        }

        db.collection('publish').add({
            data: {
                type,
                firstClassify: multiArray[0][multiIndex[0]],
                secondClassify: multiArray[1][multiIndex[1]],
                name,
                date,
                region,
                contact,
                desc,
                imgList,
                time: new Date().getTime()
            },
            success: (res) => {
                wx.switchTab({
                    url: '../index/index',
                    success: () => {
                        wx.showToast({
                            icon: 'none',
                            title: '发布成功',
                        })
                    }
                })
                // console.log(res);
                // wx.showToast({
                //     icon: 'none',
                //     title: '发布成功',
                //     duration: 1000,
                //     success: () => {
                //         setTimeout(() => {
                //             wx.switchTab({
                //                 url: '../index/index',
                //             })
                //         },1000)
                //     }
                // })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const userInfo = wx.getStorageSync('userInfo')      //获取缓存中的userInfo
        if (userInfo && userInfo.phone) {
            this.setData({
                contact: userInfo.phone
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})