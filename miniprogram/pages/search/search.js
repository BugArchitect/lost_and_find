// pages/search/search.js
let t = null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        search_input: '',  // 延时响应的值
        _search_input: '',  // 即时响应的值
        searchLog: []   // 用于储存搜索历史的数组
    },

    // 实现在数据库查询是否有与搜索内容相匹配的功能
    getSearch(e) {
        this.setData({
            _search_input: e.detail.value
        })
        // console.log(e.detail.value)

        /* 实现防抖
        setTimeout(() => {
            console.log(e.detail.value)
        }, 3000)*/
        if (t) clearTimeout(t)
        t = setTimeout(() => {
            this.setData({
                search_input: e.detail.value
            })
            // console.log(e.detail.value)
            let searchLog = wx.getStorageSync('searchLog')
            if (this.data.search_input.trim().length > 0) {
                if (searchLog) {
                    // 向数组末尾添加元素
                    // searchLog.push(e.detail.value)
                    // 向数组头部添加元素
                    searchLog.unshift(e.detail.value)
                    // wx.setStorageSync('searchLog', searchLog)
                } else {
                    searchLog = [e.detail.value]
                    // wx.setStorageSync('searchLog', searchLog)
                }
            } else {
                return
            }
            wx.setStorageSync('searchLog', searchLog)
            this.setData({
                searchLog
            })
        }, 1500)
    },

    // 实现清空搜索框内容的功能
    deleteSearch() {
        this.setData({
            search_input: '',
            _search_input: ''
        })
    },

    // 实现清空搜索历史的功能
    deleteSearchLog() {
        this.setData({
            searchLog: []
        })
        wx.removeStorageSync('searchLog')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 将搜索历史存入缓存中
        const searchLog = wx.getStorageSync('searchLog')
        this.setData({
            searchLog
        })
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