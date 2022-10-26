// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        background: ['../../images/demo2.jpg', '../../images/demo1.jpg'],
        tabList: ['寻主', '寻物'],
        select: 0,
        list: [{
                image: '../../images/demo1.jpg',
                name: '身份证',
                region: '地点',
                find_date: '发现时间',
                desc: '物体描述巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
                publish_date: '发布时间'
            },
            {
                image: '../../images/demo1.jpg',
                name: '身份证',
                region: '地点',
                find_date: '发现时间',
                desc: '物体描述巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
                publish_date: '发布时间'
            },
            {
                image: '../../images/demo1.jpg',
                name: '身份证',
                region: '地点',
                find_date: '发现时间',
                desc: '物体描述巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
                publish_date: '发布时间'
            },
            {
                image: '../../images/demo1.jpg',
                name: '身份证',
                region: '地点',
                find_date: '发现时间',
                desc: '物体描述巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
                publish_date: '发布时间'
            }
        ]
    },
    toDetail() {
        wx.navigateTo({
            url: '../detailPage/detailPage',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                select: 0
            })
        }
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