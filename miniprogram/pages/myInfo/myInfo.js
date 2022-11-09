// pages/myInfo/myInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: '',      //头像
        nickName: '',       //昵称
        edit: false,        //编辑的状态
        phone: '',      //即时
        _phone: ''      //缓存
    },

    // 改变编辑状态
    toEdit() {
        this.setData({
            edit: !this.data.edit,
            phone:this.data._phone
        })
    },

    // 向联系方式赋值
    getPhone(e) {
        const {
            value
        } = e.detail
        this.setData({
            phone: value
        })
    },

    // 清空联系方式的输入
    deletePhone() {
        this.setData({
            phone: ''
        })
    },

    // 保存输入的联系方式并存入缓存
    savePhone() {
        let userInfo = wx.getStorageSync('userInfo')
        userInfo = {
            ...userInfo,
            phone: this.data.phone
        }
        wx.setStorageSync('userInfo', userInfo)
        this.setData({
            edit: false,
            _phone:this.data.phone
        })
    },

    // 联系方式的规范化输入
    modifyPhone(){
        
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const {
            avatarUrl,
            nickName,
            phone
        } = wx.getStorageSync('userInfo')
        this.setData({
            avatarUrl,
            nickName,
            phone,
            _phone: phone
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