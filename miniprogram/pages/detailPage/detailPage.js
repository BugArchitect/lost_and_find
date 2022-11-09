// pages/detailPage/detailPage.js
const db = wx.cloud.database();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        collectionIcon: ['../../images/collect.png', '../../images/_collect.png'],  //实现收藏图标切换的数组
        info: {},   
        openid: ''  
    },

    // 实现获取联系方式功能
    toContact() {
        wx.showModal({
            title: '联系方式',
            content: '123xxxx8910',
            confirmText: '复制',
            success: (res) => {
                //   console.log(res)
                if (res.confirm) {
                    wx.setClipboardData({
                        data: '12345678910',
                        success: (res) => {
                            wx.showToast({
                                icon: 'none',
                                title: '内容已复制'
                            })
                        }
                    })
                }
            }
        })
    },

    // 实现收藏功能
    toCollect() {
        const {
            info,
            openid
        } = this.data;
        let collectionIcon = this.data.collectionIcon;
        let _id = info._id;
        delete info['_id'];
        delete info['_openid'];
        if (collectionIcon[0] === '../../images/collect.png') {
            db.collection('collection').add({
                data: {
                    ...info,
                    id: _id
                },
                success: (res) => {
                    // console.log(res);
                    wx.showToast({
                        title: '收藏成功',
                        icon: 'none'
                    })
                    let last = collectionIcon.pop();
                    collectionIcon.unshift(last)
                    this.setData({
                        collectionIcon
                    })
                },
                // fail: (err) => {
                //     console.log(err)
                // }
            })
        } else {
            db.collection('collection').where({
                id: _id,
                _openid: openid
            }).get({
                success: (res) => {
                    const {
                        data
                    } = res;
                    // console.log(data);
                    if (data.length > 0) {
                        const __id = data[0]._id;
                        db.collection('collection').doc(__id).remove({
                            success: (res) => {
                                wx.showToast({
                                    title: '取消成功',
                                    icon: 'none'
                                })
                                let last = collectionIcon.pop();
                                collectionIcon.unshift(last)
                                this.setData({
                                    collectionIcon
                                })
                            }
                        })
                    }

                }
            })
        }
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options);
        const {
            info
        } = options;
        const _info = JSON.parse(info);
        if (info) {
            this.setData({
                info: _info
            })
        }

        // 筛出当前详情数据的_id，获取缓存里的openid，去collection表里，根据_id和openid去查找，如果存在数据，就说明当前用户收藏过当前物品
        const {
            _id
        } = _info;
        const openid = wx.getStorageSync('openid');
        this.setData({
            openid
        })
        let collectionIcon = this.data.collectionIcon;
        db.collection('collection').where({
            id: _id,
            _openid: openid
        }).get({
            success: (res) => {
                if (res.data.length > 0) {
                    let last = collectionIcon.pop();
                    collectionIcon.unshift(last)
                    this.setData({
                        collectionIcon
                    })
                }
            }
        })

        // const { id } = options;
        // db.collection('publish').where({
        //     _id:id
        // }).get({
        //     success:(res)=>{
        //         console.log(res);
        //         const { data } = res;
        //         this.setData({
        //             info:data[0]
        //         })
        //     }
        // })
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