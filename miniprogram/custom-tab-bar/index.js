Component({
    data: {
        select: 0,      //判断选择的页面
        list: [{
                pagePath: "/pages/index/index",
                text: "首页",
                iconPath: "/images/home.png",
                selectedIconPath: "/images/_home.png",
                type: 0
            },
            {
                pagePath: "/pages/classify/classify",
                text: "分类",
                iconPath: "/images/classify.png",
                selectedIconPath: "/images/_classify.png",
                type: 0
            },
            {
                type: 1,
                pagePath:"/pages/publish/publish"
            },
            {
                pagePath: "/pages/collection/collection",
                text: "收藏夹",
                iconPath: "/images/collection.png",
                selectedIconPath: "/images/_collection.png",
                type: 0
            },
            {
                pagePath: "/pages/me/me",
                text: "我的",
                iconPath: "/images/me.png",
                selectedIconPath: "/images/_me.png",
                type: 0
            }
        ]
    },
    methods: {

        // 页面跳转的选择
        selectPage(e) {
            const {
                index,
                page,
                type
            } = e.currentTarget.dataset
            if(index !== this.data.select && type === 0){
                wx.switchTab({
                  url: page,
                })
            }else{
                wx.navigateTo({
                  url: page,
                })
            }
        },
    }
})