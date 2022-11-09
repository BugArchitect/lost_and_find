// pages/collection/collection.js
import {
    formatTime
} from '../../utils/index' //导入时间格式化函数

const db = wx.cloud.database();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabList: ['寻主', '寻物'],
        select: 0, //判断选择的tab
        list: [],
        login: false
    },

    getTab(e) {
        // console.log(e)
        const select = e.detail;
        this.setData({
            select
        })
        this.onLoad();
    },

    // 进入物品的详情页面
    toDetail(e) {
        let {
            item
        } = e.currentTarget.dataset;
        const id = item.id;
        delete item['_id'];
        item._id = id;
        // console.log(item)
        wx.navigateTo({
            // 通过路径将数据传入
            url: `../detailPage/detailPage?info=${JSON.stringify(item)}`,
            // url:`../detailPage/detailPage?id=${item._id}`
        })
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const login = wx.getStorageSync('login')
        this.setData({
            login: !!login
        })

        const {
            select
        } = this.data;
        // 查表，对tab进行动态切换
        const openid = wx.getStorageSync('openid')
        db.collection('collection').where({
            type: String(select),
            _openid: openid
        }).get({
            success: (res) => {
                // console.log(res);
                const {
                    data
                } = res;
                this.setData({
                    list: data.map(item => {
                        return {
                            ...item,
                            time: formatTime(item.time)
                        }
                    })
                })
            }
        })

        // // 获取用户的openid
        // const openid = wx.getStorageSync('openid')
        // // 如果用户的openid存在则不用再次获取
        // if (!openid) {
        //     wx.cloud.callFunction({
        //         name: 'get_openid',
        //         success: (res) => {
        //             // console.log(res)
        //             const {
        //                 result: {
        //                     openid
        //                 }
        //             } = res;
        //             wx.setStorageSync('openid', openid)
        //         }
        //     })
        // }

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
                select: 3
            })
        }
        this.onLoad();
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