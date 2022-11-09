// pages/classify/classify.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        asideBars:["证件","食品","书籍","生活用品","电子产品","文具"],
        select:0
    },

    // 侧边栏的选择
    selectBar(e){
        const {index} = e.currentTarget.dataset
        this.setData({
            select:index
        })
    },

    // 跳转到搜索页面
    toSearch(){
        wx.navigateTo({
          url: '../search/search',
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
        if(typeof this.getTabBar === 'function' && this.getTabBar()){
            this.getTabBar().setData({
                select:1
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